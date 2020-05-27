const UserModel = require('../model/UserModel');
const UserDao = require('../dao/UserDao');
const { genToken } = require('../services/authenticate');

class UserController {
    routes() {
        return {
            login: `/login`,
            register: `/user/register`,
            recoveryNName: `/recovery/nickName`,
            recoveryPass: `/recovery/password`,
            profilePic: `/user/profilePic`,
            user: `/user/user`,

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

                res.status(200).json({ user, token });

            } catch (err) {
                res.status(400).json({ error: err });
            }
        }
    }

    login() {
        return async (req, res) => {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao();

            try {
                const preVerification = await userModel.validationLogin();
                const user = await userDao.login(preVerification);
                const token = await genToken(user._id);
                user.password = undefined;

                res.status(200).json({ user, token });
            } catch (err) {
                res.status(400).json({ error: err });
            }
        }
    }

    get() {
        return async (req, res) => {

        }
    }

    edit() {
        return async (req, res) => {

        }
    }

    delete() {
        return (req, res) => {

        }
    }

    setProfilePic() {
        return async (req, res) => {
            let editUser = { _id: req.userId, profilePic: req.file };
            const userModel = new UserModel(editUser);
            const userDao = new UserDao();

            try {
                const user = await userDao.setProfilePic(userModel.get());
                res.status(200).json({ user: user });

            } catch (err) {
                res.status(400).json({ err })
            };
        }
    }

    deleteProfilePic() {
        return async (req, res) => {
            const userDao = new UserDao();
            
            try{
                const newUser = userDao.deleteProfilePic(req.userId, req.body.key);
                res.status(200).json(newUser);

            }catch(err) {res.status(400).json(err)};
        }
    }

    tradeProfilePic() {

    }



}
module.exports = UserController;