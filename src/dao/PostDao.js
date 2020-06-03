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

    uploadImgBody(img, id) {
        return new Promise((resolve, reject) => {
            if (!id) {
                resolve(img)
            } else {
                const db = mongo.db('myBlog').collection('post');
                db.updateOne({ _id: new ObjectId(id) },
                    { "$push": { "imgBody": img } })
                    .then(() => {
                        resolve(img);
                    })
                    .catch(err => reject(err))
            }


        })
    }

    deletImgTitle(post) {
        return new Promise((resolve, reject) => {

            this.deleteImgS3(post.imgTitle.key).then(() => {

                if (post._id) {
                    const db = mongo.db('myBlog').collection('post');
                    db.updateOne({ _id: ObjectId(post._id) },
                        { $set: { imgTitle: null } })
                        .then(() => { resolve("deletado do banco e S3") })
                        .catch(err => reject(err));
                } else { resolve("deletado do S3") };

            }).catch(err => reject(err));
        })
    }

    deletImgBody(key, id) {
        return new Promise((resolve, reject) => {

            this.deleteImgS3(key)
                .then(() => {

                    if (id) {

                        const db = mongo.db('myBlog').collection('post');

                        db.update({ _id: new ObjectId(id) },
                            { $pull: { "imgBody": { key: key } } })
                            .then(value => {
                                console.log("resultado da tentativa :" + value)
                                resolve(value);
                            })
                            .catch(err => reject(err));

                    } else { resolve() };

                }).catch(err => reject(err));

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

    deletePost(id) {
        return new Promise(async (resolve, reject) => {
            this.getId(id).then(post => {

                this.deletePostVerification(post)
                    .then(() => {
                        const db = mongo.db('myBlog').collection('post');

                        db.deleteOne({ _id: new ObjectId(id) })
                            .then(value => { resolve(value) })
                            .catch(err => reject("erro ao no banco"));

                    }).catch(err => { reject("erro verificação" + err) });

            }).catch(err => { reject(err) });

        })
    }

    deletePostVerification(post) {
        return new Promise(async (resolve, reject) => {

            if (post.imgBody.length > 0) {

                let deleteAws = post.imgBody.map(element => {
                    return { Key: element.key }
                });

                try {
                    await this.deleteS3Multi(deleteAws)
                } catch (err) { reject("erro imagem 1") };


            }

            if (post.imgTitle) {

                try {
                    await this.deleteImgS3(post.imgTitle.key)
                } catch (err) { reject("erro imagem2") };
            }

            resolve();

        })
    }

    deleteS3Multi(deleteAws) {
        return new Promise((resolve, reject) => {
            const s3 = new aws.S3();

            s3.deleteObjects({
                Bucket: process.env.AWS_BUCKET_NAME_POST,
                Delete: { Objects: deleteAws }
            }).promise().then(value => {
                resolve()
            }).catch(err => reject(err));
        })

    }

    edirPost(post) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('post');

            db.findOneAndUpdate({ _id: new ObjectId(post.id) }
                , { $set: post.newPost })
                .then(value => { 
                    if(post.newPost.title) value.value.title = post.newPost.title;
                    if(post.newPost.author) value.value.author = post.newPost.author;
                    if(post.newPost.content) value.value.content = post.newPost.content;
                    if(post.newPost.dateCreation) value.value.dateCreation = post.newPost.dateCreation;

                    resolve(value.value);
                
                })
                .catch(err => reject(err));
        })
    }
}

module.exports = PostDao;