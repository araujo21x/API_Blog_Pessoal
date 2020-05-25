const UserModel = require('../model/UserModel');
const UserDao = require('../dao/UserDao');
const {genToken} = require('../services/authenticate');

class UserController {
    routes() {
        return {
            login: `/login`,
            register: `/register`,
            recoveryNName: `/recovery/nickName`,
            recoveryPass: `/recovery/password`
        }
    }

    register() {
        return async (req, res) => {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao();

            try {
                const newUser = await userModel.validationRegister();
                const user = await userDao.register(newUser);
                const token = await genToken(user._id);

                user.password = undefined;

                res.status(200).json({user, token});

            } catch (err) {
                res.status(400).json({error: err});
            }
        }
    }

    login() {
        return async (req, res) => {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao();

            try{
                const preVerification = await userModel.validationLogin();
                const user = await userDao.login(preVerification);
                const token = await genToken(user._id);
                user.password = undefined;

                res.status(200).json({user, token});
            }catch(err){
                res.status(400).json({error: err});
            }
        }
    }

}
module.exports = UserController;