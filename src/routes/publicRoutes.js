const UserController = require('../controller/UserController');
const user = new UserController;

module.exports = (app) =>{
    const routes = user.routes();

    app.post(routes.register, user.register());
    app.post(routes.login, user.login());
}