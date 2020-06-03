const CommentModel = require('../model/CommentModel');
const CommentDao = require('../dao/CommentDao');

class CommentController {

    routes() {
        return {
            comment: '/comment/comment',
            getForPost: '/comment/forPost',
            getForUser: '/comment/forUser',
            imgComment: '/comment/imgComment',
        };
    }

    creatComment() {
        return async (req, res) => {
            req.body._idAuthor = req.userId;
            const commentModel = new CommentModel(req.body);
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.creat(commentModel.get());
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    getComment() {
        return async (req, res) => {
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.getComment(req.body.id);
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    getForPost() {
        return async (req, res) => {
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.getCommentForPost(req.body.idPost);
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    getForUser() {
        return async (req, res) => {
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.getCommentForUser(req.body.idUser);
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    deleteComment() {
        return async (req, res) => {
            const commentDao = new CommentDao();

            try {
                const response = await commentDao.deleteComment(req.body.idComment);
                res.status(200).json(response);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    editComment() {
        return async (req, res) => {
            const commentModel = new CommentModel({_id:req.body.id, content: req.body.content});
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.editComment(commentModel.editComment());
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    addImage() {
        return async (req, res) => {
            const commentModel = new CommentModel({_id:req.body.id, imageBody: req.file});
            const commentDao = new CommentDao();

            try {
                const comment = await commentDao.addImg(commentModel.get());
                res.status(200).json(comment);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    deleteImage() {
        return async (req, res) => {
            const commentModel = new CommentModel({_id:req.body.id, imageBody: {key:req.body.key}});
            const commentDao = new CommentDao();

            try {
                const response = await commentDao.deletImg(commentModel.get());
                res.status(200).json(response);

            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

}

module.exports = CommentController;