const mongo = require('../config/mongoDb');
const ObjectId = require('mongodb').ObjectId;
const aws = require(`aws-sdk`);
require('dotenv/config');

class CommentDao {

    creat(comment) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.insertOne(comment).then(value => {
                resolve(value.ops[0]);
            }).catch(err => reject(err));
        })
    }

    getComment(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.findOne({ _id: new ObjectId(id) })
                .then(comment => {
                    if (!comment) reject(comment);
                    resolve(comment);
                })
                .catch(err => reject(err));
        })
    }

    getCommentForUser(idUser) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.find({ "author._idAuthor": idUser }).toArray()
                .then(comments => {
                    if (!comments) reject(comments);
                    resolve(comments);
                })
                .catch(err => reject(err));
        })
    }

    getCommentForPost(idPost) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.find({ idPost: idPost }).toArray()
                .then(comments => {
                    if (!comments) reject(comments);
                    resolve(comments);
                })
                .catch(err => reject(err));
        })
    }

    addImg(comment) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            if (!comment._id) {
                resolve(comment.imageBody)
            } else {
                db.findOneAndUpdate({ _id: ObjectId(comment._id) },
                    { $set: { imageBody: comment.imageBody } })
                    .then(value => {
                        value.value.imageBody = comment.imageBody;
                        resolve(value.value);
                    }).catch(err => { reject(err) });
            }

        })
    }

    deletImg(comment) {
        return new Promise((resolve, reject) => {

            this.deleteImgS3(comment.imageBody.key).then(() => {

                if (comment._id) {
                    const db = mongo.db('myBlog').collection('comment');

                    db.updateOne({ _id: ObjectId(comment._id) },
                        { $set: { imageBody: null } })
                        .then(() => { resolve("deletado do banco e S3") })
                        .catch(err => reject(err));
                } else { resolve("deletado do S3") };

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

    editComment(comment) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.findOneAndUpdate({ _id: new ObjectId(comment.id) },
                { $set: comment.newComment })
                .then(newComment => {
                    newComment.value.content = comment.newComment.content;
                    resolve(comment.value);
                })
                .catch(err => reject(err));
        })
    }

    deleteComment(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.findOne({ _id: new ObjectId(id) })
                .then(comment => {
                    if (comment.imageBody) {

                        this.deleteImgS3(comment.imageBody.key)
                            .then(() => {
                                this.deleteCommentDB(comment._id)
                                    .then(response => resolve(response))
                                    .catch(error => reject(error));
                            })
                            .catch(() => reject(`erro ao apagar na S3`));

                    } else {
                        this.deleteCommentDB(comment._id)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                    }

                }).catch(() => reject(`erro ao encontrar ususario`));
        })
    }
    deleteCommentDB(id) {
        return new Promise((resolve, reject) => {
            const db = mongo.db('myBlog').collection('comment');

            db.deleteOne({ _id: new ObjectId(id) })
                .then(() => resolve(`Comentario Apagado`))
                .catch(() => reject(`Erro ao apagar usuário do banco`));
        })
    }
}
module.exports = CommentDao;