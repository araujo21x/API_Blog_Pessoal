const mongo = require('../config/mongoDb');
const ObjectId = require('mongodb').ObjectId;
const aws = require(`aws-sdk`);
require('dotenv/config');

class PostDao {

    creat(post) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');

            db.insertOne(post).then(value => {
                resolve(value.ops[0]);
            }).catch(err => reject(err));
        })
    }

    getId(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');
            
            db.findOne({ _id: new ObjectId(id) })
                .then(post => {
                    if (!post) reject(post);
                    resolve(post);
                })
                .catch(err => reject(err));
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');

            db.find().toArray()
                .then(posts => { resolve(posts) })
                .catch(err => reject(err));
        })
    }

    getAllUser(idUser){
        return new Promise ((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');
            console.log(idUser);
            db.find({'author._idAuthor': idUser}).toArray()
                .then(posts => resolve(posts))
                .catch(err => reject(err));
        })
    }
    
}

module.exports = PostDao;