const CommentController = require('../controller/CommentController');
const multer = require(`multer`);
const multerConfig = require(`../config/multerPost`);

const commentController = new CommentController();



module.exports = app => {
    const route = commentController.routes();

    app.route(route.comment)
        .post(commentController.creatComment())
        .get(commentController.getComment())
        .delete(commentController.deleteComment())
        .patch(commentController.editComment());

    app.get(route.getForPost, commentController.getForPost());
    app.get(route.getForUser, commentController.getForUser());

    app.route(route.imgComment)
        .post(multer(multerConfig).single('file'), commentController.addImage())
        .delete(commentController.deleteImage());
}