# API Blog/Pessoal
API para um projeto de Blog/portfólio pessoal, que funcione para demonstrar meus projetos, além de um fichário digital para guardar anotações de estudos, funcionando como um suporte ao meu perfil do GitHub, Durante a construção coloco em prática estudos sobre API REST, MongoDB, Node.Js, Js entre outros.

### **Version Node**: 12.15.0
# Rotas(pre-documentação_tentativa 01)

 * Registrar usuário 
    - endereço: /register ;
    - método: POST;
    - request: Json com {name, lastName, email, nickName, password, birthday};
    - response: o erro ou {"message": "cadastrado com sucesso", o usuario e token}.
### Adicionar campo "authotization" na Header com a palavra Bearer e o token ex:<Bearer token>
    * Login
        - endereço: /login ;
        - método: POST;
        - request: Json com {email ou nickName e password};
        - response: o erro ou {usuario, token}.

    * Adicionar Foto de perfil
        - endereço: /user/profilePic ;
        - método: POST;
        - request: {file: com o arquivo de foto até 2mb};
        - response: o erro ou {usuario com os dados da foto}.

    * Remover Foto de perfil
        - endereço: /user/profilePic ;
        - método: DELETE;
        - request: json com {key: key da foto};
        - response: o erro ou {usuario com os dados atualizados}.

# Modulos
 * express 4.17.1;
 * modemon 2.0.4;
 * body-parser 1.19.0;
 * mongodb 3.5.7;
 * dotenv 8.2.0;
 * aws-sdk 2.684.0;
 * bcryptjs 2.4.3;
 * jsonwebtoken: 8.5.1;
 * morgan: 1.10.0;
 * multer: 1.4.2;
 * multer-s3: 2.9.0.