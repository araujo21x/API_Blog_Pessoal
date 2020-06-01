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

    getAllUser(idUser) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');
            console.log(idUser);
            db.find({ 'author._idAuthor': idUser }).toArray()
                .then(posts => resolve(posts))
                .catch(err => reject(err));
        })
    }

    uploadImgTitle(post) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');

            if (!post._id) {
                resolve(post.imgTitle)
            } else {
                db.findOneAndUpdate({ _id: ObjectId(post._id) },
                    { $set: { imgTitle: post.imgTitle } })
                    .then(value => {
                        value.value.imgTitle = post.imgTitle;
                        resolve(value.value);
                    }).catch(err => { reject(err) });
            }

        })
    }

    deletImg(post) {
        return new Promise((resolve, reject) => {
            if (post.imgTitle) {

                this.deleteImgS3(post.imgTitle.key).then(() => {

                    if (post._id) {
                        const db = mongo.db('myBlog').collection('post');
                        db.updateOne({ _id: ObjectId(post._id) },
                            { $set: { imgTitle: null } })
                            .then(() => { resolve("deletado do banco e S3") })
                            .catch(err => reject(err));
                    } else { resolve("deletado do S3") };

                }).catch(err => reject(err));

            } else {
                this.deleteImgS3(post.key)
                    .then(() => {
                        if (post._id) {

                            const db = mongo.db('myBlog').collection('post');

                            db.update({ _id: new ObjectId(post._id) },
                                { $pull: { "imgContent": { key: post.key } } })
                                .then(value => {
                                    console.log("resultado da tentativa :" + value)
                                    resolve(value);
                                })
                                .catch(err => reject(err));

                        } else { resolve() };
                    }).catch(err => reject(err));
            }
        })
    }

    deleteImgS3(key) {
        return new Promise((resolve, reject) => {
            const s3 = new aws.S3();

            s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME_POST,
                Key: key
            }).promise()
                .then(() => resolve())
                .catch(err => reject(err));

        })
    }


}

module.exports = PostDao;