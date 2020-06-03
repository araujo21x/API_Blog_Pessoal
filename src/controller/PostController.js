const PostModel = require('../model/PostModel');
const PostDao = require('../dao/PostDao');
const ImgBodyModel = require('../model/ImgBodyModel');

class PostController {
    routes() {
        return {
            post: "/post/post",
            getAll: "/post/getAll",
            getAllIdUser: "/post/getAllIdUser",
            imgTitle: "/post/imgTitle",
            imgBody: "/post/imgBody",
        };
    }

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
            const postModel = new PostModel(req.body);
            const postDao = new PostDao();

            try{
                const newPost = await postDao.edirPost(postModel.editPost());
                res.status(200).json(newPost);
            }catch(err){res.status(400).json(err)};
        }
    }

    delete() {
        return async (req, res) => {
            const postDao = new PostDao();

            try{
                const response = await postDao.deletePost(req.body.id);
                res.status(200).json(response);

            }catch(err){res.status(400).json(err)};
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

    deleteImgTitle() {
        return async (req, res) => {
            const postDao = new PostDao();

            try {
                const resp = await postDao.deletImgTitle({ _id: req.body._id, imgTitle: req.body.imgTitle });
                res.status(200).json(resp);
            } catch (err) { res.status(400).json(err) };
        }
    }

    insertImgBody() {
        return async (req, res) => {
            const imgBodyModel = new ImgBodyModel(req.file).get();
            const postDao = new PostDao();

            try {
                const response = await postDao.uploadImgBody(imgBodyModel, req.body.id);
                res.status(200).json(response);
            } catch (err) {
                res.status(400).json(err)
            }

        }
    }

    deleteImgBody() {
        return async (req, res) => {
            const postDao = new PostDao();

            try {
                const response = await postDao.deletImgBody(req.body.key, req.body.id);
                console.log(response)
                res.status(200).json(response)
            } catch (err) {
                res.status(400).json(err)
            }
        }
    }

}

module.exports = PostController;