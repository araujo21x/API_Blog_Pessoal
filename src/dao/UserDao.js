const mongo = require('../config/mongoDb');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const aws = require(`aws-sdk`);
require('dotenv/config');

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
                }).catch(err => reject(err))
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

    getUser(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');
            db.findOne({ _id: new ObjectId(id) })
                .then(user => resolve(user))
                .catch(err => reject(err));
        })

    }

    deleteUser(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            db.deleteOne({ _id: new ObjectId(id) })
                .then(() => { resolve() })
                .catch((err) => { reject(err) })
        })
    }

    setProfilePic(user) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            db.findOneAndUpdate({ _id: new ObjectId(user._id) },
                { $set: { profilePic: user.profilePic } })
                .then(userNew => {
                    userNew.value.profilePic = user.profilePic;
                    console.log(userNew.value);
                    resolve(userNew.value)
                })
                .catch(err => reject(err))
        })
    }

    deleteProfilePic(id, key) {
        return new Promise((resolver, reject) => {
            const db = mongo.db('myBlog').collection('user');

            this.deleteProfileS3(key).then(() => {

                db.findOneAndUpdate({ _id: new ObjectId(id) },
                    { $set: { profilePic: null } })
                    .then(user => {
                        user.value.profilePic = null;
                        resolver(user.value);
                    }).catch(err => reject(err));

            }).catch(err => reject({ err }));

        });
    }

    deleteProfileS3(key) {
        return new Promise((resolver, reject) => {
            const s3 = new aws.S3();

            s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key
            }).promise()
                .then(() => resolver(true))
                .catch(err => reject(err));

        });
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

    editOtherChamps(id, newUser) {
        return new Promise(async (resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');
            newUser.password = await bcrypt.hash(newUser.password, 10);
            
            db.findOneAndUpdate({ _id: new ObjectId(id) },
                { $set: newUser })
                .then(user => {
                    if(newUser.name) user.value.name = newUser.name;
                    if(newUser.lastName) user.value.lastName = newUser.lastName;
                    if(newUser.birthDay) user.value.birthDay = newUser.birthDay;
                    if(newUser.socialNetwork) user.value.socialNetwork = newUser.socialNetwork;

                    resolve(user.value);
                }).catch(err => reject(err));
        })
    }
    
    editEmail(newEmail, id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            this.verificEmail(newEmail, db).then(() => {
                db.update({ _id: ObjectId(id) },
                    { $set: { email: newEmail } })
                    .then(() => resolve({ email: newEmail, message: `email trocado` }))
                    .catch(err => reject(err));
            })
                .catch(err => reject(err));
        })
    }

    editNickName(newNickName, id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');

            this.verificNick(newNickName, db).then(() => {
                db.update({ _id: ObjectId(id) },
                    { $set: { nickName: newNickName } })
                    .then(() => resolve({ nickName: newNickName, message: `NickName trocado` }))
                    .catch(err => reject(err));
            })
                .catch(err => reject(err));
        })
    }

    verificEmail(newEmail, db) {
        return new Promise((resolve, reject) => {

            db.findOne({ email: newEmail })
                .then(value => {
                    if (value) reject(`*Email já cadastrado`);
                    else resolve();
                })
                .catch(err => reject(err))
        })
    }

    verificNick(newNickName, db) {
        return new Promise((resolve, reject) => {

            db.findOne({ nickName: newNickName })
                .then(value => {
                    if (value) reject(`*NickName já cadastrado`);
                    else resolve();
                })
                .catch(err => reject(err))
        })
    }
}

module.exports = UserDao;