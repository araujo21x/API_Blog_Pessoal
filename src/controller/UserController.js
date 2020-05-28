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
            email: `/user/email`,
            nickName:`/user/nickName`
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
            const userDao = new UserDao();

            try {
                const user = await userDao.getUser(req.userId);
                console.log(user);
                res.status(200).json(user);
            } catch (err) {
                console.log(err)
                res.status(400).json({ err })
            }
        }
    }

    edit() {
        return async (req, res) => {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao()

            try{
                const editUser = await userModel.creatEditUser();
                const newUser = await userDao.editOtherChamps(req.userId, editUser);
                newUser.password = undefined;
                res.status(200).json(newUser);
            }catch(err){res.status(400).json(`error: ${err}`)};
        }
    }

    delete() {
        return async (req, res) => {
            const userDao = new UserDao();

            try {
                const response = await userDao.deleteUser(req.userId);
                res.status(200).json({ message: `user deletado`, response });
            } catch (err) {
                res.status(400).json({ err });
            }
        }
    }

    editEmail() {
        return async (req, res) => {
            const userModel = new UserModel(req.body);
            const userDao = new UserDao();
            
            try{
                const verifEmail = await userModel.verificationEmail();

                if(verifEmail.length > 0) 
                    res.status(400).json({message: `${verifEmail}`});

                const newUser = await userDao.editEmail(req.body.email, req.userId)

                res.status(200).json(newUser);

            }catch(err){
                res.status(400).json({err:err});
            }

        }
    }

    editNickName() {
        return async (req, res) => {
            const userDao = new UserDao();
            
            try{
                const newUser = await userDao.editNickName(req.body.nickName, req.userId)

                res.status(200).json(newUser);

            }catch(err){
                res.status(400).json({err:err});
            }
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

            try {
                const user = await userDao.deleteProfilePic(req.userId, req.body.key);
                res.status(200).json({ user: user });

            } catch (err) { res.status(400).json(err) };
        }
    }

    tradeProfilePic() {
        return async(req, res)=> {
            let editUser = { _id: req.userId, profilePic: req.file };

            const userModel = new UserModel(editUser);
            const userDao = new UserDao();

            try {
                const deletePicS3 = await userDao.deleteProfileS3(req.body.key);

                if(!deletePicS3) res.status(400).json({err: true});

                const user = await userDao.setProfilePic(userModel.get());

                res.status(200).json({ user: user });

            } catch (err) {
                res.status(400).json({ err })
            };
        }
    }

}
module.exports = UserController;