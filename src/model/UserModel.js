class UserModel {
    constructor(user) {
        this._user = {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            nickName: user.nickName,
            password: user.password,
            birthDay: user.birthDay,
            creat: user.creat,
            update: user.update,
            profilePic: !user.profilePic ? null : {
                name: user.profilePic.originalname,
                size: user.profilePic.size,
                key: user.profilePic.key,
                url: !user.profilePic.location ? "" : user.profilePic.location,
            },
            socialNetwork: user.socialNetwork
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

    validationLogin() {
        return new Promise((resolve, reject) => {
            let mensagem = ``;
            if (this._user.email) {
                this.verificationEmail()
                    .then(menssageEmail => {
                        mensagem = `${mensagem}${menssageEmail}`

                        this.verificationPassword()
                            .then(menssagePassword => {
                                mensagem = `${mensagem}${menssagePassword}`

                                mensagem > 0 ? reject(mensagem) : resolve(this.get());
                            })
                    });

            } else {
                if (!this._user.nickName) reject(`email ou login não informado`);

                this.verificationPassword()
                    .then(menssagePassword => {
                        mensagem = `${mensagem}${menssagePassword}`

                        mensagem > 0 ? reject(mensagem) : resolve(this.get());
                    });
            }



        })
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
            let message = ``;

            if (!this._user.name) message = `${message} *Nome não informado`;
            if (!this._user.lastName) message = `${message} *Sobrenome não informado`;
            if (!this._user.email) message = `${message} *Email não informado`;
            if (!this._user.nickName) message = `${message} *NickName não informado`;
            if (!this._user.password) message = `${message} *Senha não informada`;
            if (!this._user.birthDay) message = `${message} *Data de nascimento não informada`;

            resolver(message)
        })

    }

    verificationPassword() {
        return new Promise(resolve => {
            let menssagePassword = ``;

            if (this._user.password) {
                if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(this._user.password))
                    menssagePassword = ` *Senha invalida: Senha precisa ter mais de 6 caractere, um caractere especial, um numero e uma letra`;
            }

            resolve(menssagePassword);
        })

    }

    verificationEmail() {
        return new Promise(resolve => {
            let menssageEmail = ``;

            if (this._user.email) {
                if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this._user.email))
                    menssageEmail = ` *Email Invalido`;
            }

            resolve(menssageEmail);
        })

    }

}

module.exports = UserModel;