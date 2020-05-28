const UserController = require('../controller/UserController');
const multer = require(`multer`);
const multerConfig = require(`../config/multer`);

const user = new UserController;

module.exports = app => {
    const routes = user.routes();

    app.route(routes.user)
        .get(user.get())
        .delete(user.delete())
        .patch(user.edit());

    app.patch(routes.email, user.editEmail());
    app.patch(routes.nickName, user.editNickName());

    app.route(routes.profilePic)
        .post(multer(multerConfig).single(`file`), user.setProfilePic())
        .delete(user.deleteProfilePic())
        .patch(multer(multerConfig).single(`file`), user.tradeProfilePic());
    
}