const PostController = require('../controller/PostController');
const multer = require(`multer`);
const multerConfig = require(`../config/multerPost`);

const postController = new PostController();

module.exports = app =>{
    const routes = postController.routes();

    app.route(routes.post)
        .post(postController.creat())
        .get(postController.get())
        .delete(postController.delete())
        .patch(postController.edit());

    app.get(routes.getAll, postController.getAll());
    app.get(routes.getAllIdUser, postController.getAllIdUser());

}