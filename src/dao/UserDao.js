const mongo = require('../config/mongoDb');

class UserDao {

    register(user) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('user');
            db.insertOne(user).then((user) => {
                console.log("eba foi!!!")
                resolve(user);
            })
                .catch(err => console.log(err));
        })

    }
}

module.exports = UserDao;