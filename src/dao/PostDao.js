const mongo = require('../config/mongoDb');
const ObjectId = require('mongodb').ObjectId;
const aws = require(`aws-sdk`);
require('dotenv/config');

class PostDao{
    creat(){
        return new Promise((resolve, reject)=> {
            const db = mongo.db('myBlog').collection('post');
        })
    }
}

module.exports = PostDao;