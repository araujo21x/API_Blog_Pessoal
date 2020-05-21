const UserModel = require('../model/UserModel');
const UserDao = require('../dao/UserDao');

class UserController{
    routes(){
        return{
            login:`/login`,
            register:`/register`,
            recoveryNName: `/recovery/nickName`,
            recoveryPass: `/recovery/password`
        }
    }

    register(){
        return async (req, res)=> {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao();

            try{
                const newUser = await userModel.validationRegister();
                const user = await userDao.register(newUser);

                res.status(200).json({message: "Cadastrado com sucesso!", user/*: user.ops[0]*/});

            }catch(err){
                res.status(400).json(err);
            }
        }
    }

}
module.exports = UserController;