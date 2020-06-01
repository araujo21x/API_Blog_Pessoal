const PostModel = require('../model/PostModel');
const PostDao = require('../dao/PostDao');

class PostController {
    routes() {
        return {
            post: "/post/post",
            getAll: "/post/getAll",
            getAllIdUser: "/post/getAllIdUser",
            imgTitle: "/post/imgTitle"
        };
    }

    // criar funções pra adicionar imagens e remover e funções pra cadastrar as postagem e modificar como se fosse difierente kkkkkkkkkkkkkkkkkk

    creat() {
        return async (req, res) => {
            const postModel = new PostModel(req.body, req.userId);
            const postDao = new PostDao();

            try {
                const post = await postDao.creat(postModel.get());
                res.status(200).json(post);
            } catch (err) {
                res.status(400).json(err);
            }
        }
    }

    get() {
        return async (req, res) => {
            const postDao = new PostDao();

            try {
                const post = await postDao.getId(req.body.id);
                res.status(200).json(post);
            } catch (err) { res.status(400).json(err); }
        }
    }

    getAll() {
        return async (req, res) => {
            const postDao = new PostDao();

            try {
                const posts = await postDao.getAll();
                res.status(200).json(posts);
            } catch (err) { res.status(400).json(err) };
        }
    }

    getAllIdUser() {
        return async (req, res) => {
            const postDao = new PostDao();

            try {
                const posts = await postDao.getAllUser(req.body.id)
                res.status(200).json(posts);
            } catch (err) { res.status(400).json(err); };
        }
    }

    edit() {
        return async (req, res) => {

        }
    }

    delete() {
        return async (req, res) => {

        }
    }

    insertImgTitle() {
        return async (req, res) => {
            const postModel = new PostModel({ _id: req.body._id, imgTitle: req.file }, req.userId);
            const postDao = new PostDao();
            try {
                const response = await postDao.uploadImgTitle(postModel.get());
                res.status(200).json(response);

            } catch (err) { res.status(400).json(err) }
        }
    }

    insertImg() {
        return async (req, res) => {

        }
    }

    deleteImgTitle() {
        return async (req, res) => {
            const postDao = new PostDao();
           
            try {
                const resp = await postDao.deletImg({_id: req.body._id, imgTitle: req.body.imgTitle });
                res.status(200).json(resp);
            } catch (err) { res.status(400).json(err) };
        }
    }

}

module.exports = PostController;