const UserModel = require('../model/UserModel');

class UserController{
    constructor(){}

    routes(){
        return{
            login:`/login`,
            register:`/register`,
            recoveryNName: `/recovery/nickName`,
            recoveryPass: `/recovery/password`
        }
    }

    register(){
        return (req, res)=> {
            const user = new UserModel();

            user.registerUser();

            res.send(`oi`)
        }
    }

}
module.exports = UserController;