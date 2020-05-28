const PostModel = require('../model/PostModel');
const PostDao = require('../dao/PostDao');

class PostController {
    routes() {
        return {
            post: "/post/post",
            getAll: "/post/getAll",
            getAllIdUser: "/post/getAllIdUser",
        };
    }

    creat() {
        return async (req, res) => {
            
        }
    }

    get() {
        return async (req, res) => {

        }
    }

    getAll() {
        return async (req, res) => {

        }
    }


    getAllIdUser() {
        return async (req, res) => {

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

}

module.exports = PostController;