const PostModel = require('../model/PostModel');
const PostDao = require('../dao/PostDao');

class PostController {
    routes() {
        return {
            post: "/post/post",
            getAll: "/post/getAll",
            getAllIdUser: "/post/getAllIdUser",
            img: "/post/img"
        };
    }

    // criar funções pra adicionar imagens e remover e funções pra cadastrar as postagem e modificar como se fosse difierente kkkkkkkkkkkkkkkkkk

    creat() {
        return async (req, res) => {
            const postModel = new PostModel(req.body, req.userId);
            const postDao = new PostDao();

            try{
                const post = await postDao.creat(postModel.get());
                res.status(200).json(post);
            }catch(err){
                res.status(400).json(err);
            }
        }
    }

    get() {
        return async (req, res) => {
            const postDao = new PostDao();

            try{
                const post = await postDao.getId(req.body.id);
                res.status(200).json(post);
            }catch(err){res.status(400).json(err);}
        }
    }

    getAll() {
        return async (req, res) => {
            const postDao = new PostDao();
            
            try{
                const posts = await postDao.getAll();
                res.status(200).json(posts);
            }catch(err) {res.status(400).json(err)};
        }
    }

    getAllIdUser() {
        return async (req, res) => {
            const postDao = new PostDao();

            try{
                const posts = await postDao.getAllUser(req.body.id)
                res.status(200).json(posts);
            }catch(err){ res.status(400).json(err);};
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

    insertImg(){
        return async (req,res)=> {

            try{

            }catch(err){ res.status(400).json(err)};
        }
    }

    deleteImg(){
        return async(req, res)=>{
            try{

            }catch(err){ res.status(400).json(err)};
        }
    }
}

module.exports = PostController;