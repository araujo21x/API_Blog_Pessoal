const UserController = require('../controller/UserController');
const multer = require(`multer`);
const multerConfig = require(`../config/multer`);

const user = new UserController;

module.exports = app => {
    const routes = user.routes();

    app.route(routes.profilePic)
        .post(multer(multerConfig).single(`file`), user.setProfilePic());
}