
class UserModel {
    constructor(user) {
        this._user = {
            _id: typeof user._id == "undefined" ? undefined : user._id,
            _name: typeof user.name == "undefined" ? undefined : user.name,
            _lastName: typeof user.lastName == "undefined" ? undefined : user.lastName,
            _email: typeof user.email == "undefined" ? undefined : user.email,
            _nickName: typeof user.nickName == "undefined" ? undefined : user.nickName,
            _password: typeof user.password == "undefined" ? undefined : user.password,
            _birthDay: typeof user.birthDay == "undefined" ? undefined : user.birthDay,
            _creat: typeof user.creat == "undefined" ? undefined : user.creat,
            _photoProfile: typeof user.photoProfile == "undefined" ? undefined : user.photoProfile,
            _socialNetwork: typeof user.socialNetwork == "undefined" ? undefined : user.socialNetwork
        }
    }

    get() {
        return this._user;
    }

    validationRegister() {
        return new Promise((resolver, reject) => {
            this.verificationAll(response => {
                if (response.length > 19)
                    reject(response);
                    
                resolver(this.get());
            });
        });
    }

    verificationAll(callback) {

        let message = "Campo(s) Incorreto:";

        this.verificationCamp()
            .then(response => {

                message = message + response;
                this.verificationPassword()
                    .then(responsePassword => {

                        message = message + responsePassword;
                        this.verificationEmail()
                            .then(responseEmail => {
                                message = message + responseEmail;
                                callback(message);
                            })
                    })
            })
    }

    verificationCamp() {
        return new Promise(resolver => {
            let i = 0;
            let message = ``;

            do {
                if (!this._user._name) message = `${message} *Nome não informado`;
                if (!this._user._lastName) message = `${message} *Sobrenome não informado`;
                if (!this._user._email) message = `${message} *Email não informado`;
                if (!this._user._nickName) message = `${message} *NickName não informado`;
                if (!this._user._password) message = `${message} *Senha não informada`;
                if (!this._user._birthDay) message = `${message} *Data de nascimento não informada`;
                i++;
            } while (i == 0);

            if (i > 0) resolver(message)
        })

    }

    verificationPassword() {
        return new Promise(resolve => {
            let menssagePassword = ``;

            if (this._user._password) {
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(this._user._password))
                    menssagePassword = ` *Senha Invalida`;
            }

            resolve(menssagePassword);
        })

    }

    verificationEmail() {
        return new Promise(resolve => {
            let menssageEmail = ``;

            if (this._user._email) {
                if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this._user._email))
                    menssageEmail = ` *Email Invalido`;
            }

            resolve(menssageEmail);
        })

    }

}

module.exports = UserModel;