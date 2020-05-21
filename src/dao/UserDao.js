const mongo = require('../config/mongoDb');

class UserDao {

    register(user) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            this.verificEmail_Nick(db, user)
                .then(() => db.insertOne(user).then(user => resolve(user)).catch(err => reject(err))).catch(err => reject(err));
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