const mongo = require('../config/mongoDb');
const bcrypt = require('bcryptjs');

class UserDao {

    register(user) {
        return new Promise(async (resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            this.verificEmail_Nick(db, user)
                .then(() => {
                    bcrypt.hash(user.password, 10).then(hash => {
                        user.password = hash;

                        db.insertOne(user)
                            .then(user => {
                                resolve(user.ops[0])

                            }).catch(err => reject(err));

                    }).catch(err => reject(err));
                })
        })
    }

    login(user) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');
            if (user.email) {
                db.findOne({ email: user.email }).then(response => {
                    if (!response)
                        reject(`Usuário não encontrando, reveja seus dados`)

                    bcrypt.compare(user.password, response.password)
                        .then(value => {
                            if (!value) reject(`senha incorreta`);
                            resolve(response);
                        })
                        .catch(() => reject(`senha incorreta`));

                }).catch(err => rejetct(err));

            } else {
                db.findOne({ nickName: user.nickName }).then(response => {
                    if (!response)
                        reject(`Usuário não encontrando, reveja seus dados`);

                    bcrypt.compare(user.password, response.password)
                        .then(value => {
                            if (!value) reject(`senha incorreta`);
                            resolve(response);

                        }).catch(() => reject(`senha incorreta`));

                }).catch(err => rejetct(err));
            }
        })
    }

    verificEmail_Nick(db, user) {
        return new Promise((resolve, reject) => {

            let message = ``;

            db.find({ $or: [{ nickName: user.nickName }, { email: user.email }] }).toArray()
                .then(users => {

                    if (users.length > 0) {
                        users.map(element => {
                            element.email === user.email ? message = `${message} *Email já cadastrado` : message;
                            element.nickName === user.nickName ? message = `${message} *nickName já cadastrado` : message;
                        });

                        reject(message);
                    } else {
                        resolve();
                    }
                })
                .catch(err => reject(err));
        })

    }

    verificEmail() {

    }

    verificNick() {

    }
}

module.exports = UserDao;