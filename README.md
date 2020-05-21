# API Blog/Pessoal
API para um projeto de Blog/portfólio pessoal, que funcione para demonstrar meus projetos, além de um fichário digital para guardar anotações de estudos, funcionando como um suporte ao meu perfil do GitHub, Durante a construção coloco em prática estudos sobre API REST, MongoDB, Node.Js, Js entre outros.

### **Version Node**: 12.15.0
# Rotas
 * /register
    - request: objeto com {name, lastName, email, nickName, password, birthday};
    - response: o erro ou um objeto {"message": "cadastrado com sucesso", user}.
# Modulos
 * express 4.17.1;
 * modemon 2.0.4;
 * body-parser 1.19.0;
 * mongodb 3.5.7;
 * dotenv 8.2.0 
