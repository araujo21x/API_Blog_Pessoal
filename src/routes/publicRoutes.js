const UserController = require('../controller/UserController');
const user = new UserController;

module.exports = (app) =>{
    const routes = user.routes();

    app.get(routes.register, user.register());
}