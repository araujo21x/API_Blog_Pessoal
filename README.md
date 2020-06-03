# API Blog/Pessoal
API para um projeto de Blog/portfólio pessoal, que funcione para demonstrar meus projetos, além de um fichário digital para guardar anotações de estudos, funcionaria como um suporte ao meu perfil do GitHub, Durante a construção coloco em prática estudos sobre API REST, MongoDB, Node.Js, Js entre outros.

OBS: O funcionamento das imagens, imaginei um front onde o usuário somente adiciona ou apaga, como um arquivo anexado na caixa "nova mensagem" do gmail, onde coloca o arquivo e se não quiser apaga.

### **Version Node**: 12.15.0

# Rotas(pre-documentação_tentativa 01)

 * Registrar usuário 
    - endereço: /register ;
    - método: POST;
    - request: Json com {name, lastName, email, nickName, password, birthday};
    - response: o erro ou {"message": "cadastrado com sucesso", o usuario e token}.

* Login
    - endereço: /login ;
    - método: POST;
    - request: Json com {email ou nickName e password};
    - response: Erro ou {usuario, token}.
### Adicionar campo "authotization" na Header com a palavra Bearer e o token ex:<Bearer token>

### Rotas para trabalhar com Usuário:
* Pegar dados do usuário
    - endereço: /user/user ;
    - método: GET;
    - request: nada;
    - response: Erro ou usuario.

* Deletar usuário
    - endereço: /user/user ;
    - método: DELETE;
    - request: nada;
    - response: Erro ou mensagem de <usuario deletado>.

* Trocar Email
    - endereço: /user/email ;
    - método: PATCH;
    - request: json {email: "novo email"};
    - response: Erro ou usuário.

* Trocar NickName
    - endereço: /user/nickName ;
    - método: PATCH;
    - request: json {nickName: "novo nickName"};
    - response: Erro ou usuário.

* Adicionar Foto de perfil
    - endereço: /user/profilePic ;
    - método: POST;
    - request: {file: com o arquivo de foto até 2mb};
    - response: Erro ou {usuario com os dados da foto}.

* Remover Foto de perfil
    - endereço: /user/profilePic ;
    - método: DELETE;
    - request: json com {key: key da foto};
    - response: Erro ou {usuario com os dados atualizados}.

* Trocar foto de perfil
    - endereço: /user/profilePic ;
    - método: PATCH;
    - request: {file: com o arquivo de foto até 2mb e key: key da foto foto de perfil atual};
    - response: Erro ou {usuario com os dados atualizados}.

### Rotas para trabalhar com Post:

* Criar Post
    - endereço: /post/post;
    - método: POST;
    - request: json com {title, author:{_idAuthor, name, lastName, nickName urlProfilePic}, content};
    - response: Erro ou post.

* Pegar post por ID
    - endereço: /post/post;
    - método: GET;
    - request: json com {id}, OBS: id do post;
    - response: Erro ou post.

* Pegar todos os posts
    - endereço: /post/getAll;
    - método: GET;
    - request: nada;
    - response: Erro ou posts.

* Pegar posts de um usuário
    - endereço: /post/getAllIdUser;
    - método: GET;
    - request: json com {id}, OBS: id do usuário;
    - response: Erro ou post.

* Deletar post
    - endereço: /post/post;
    - método: DELETE;
    - request: json com {id}, OBS: id do post;
    - response: Erro ou informações do delete no banco.

* Editar post
    - endereço: /post/post;
    - método: PATCH;
    - request: json com {id, title, content};
    - descrição: só e possivel mudar title e content do post, para modificar imagens tem rotas especificas;
    - response: Erro ou usuario motificado.

* Adicionar imagem de titulo
 - endereço: /post/imgTitle;
    - método: POST;
    - request: {file: com o arquivo de foto até 2mb, _id: id do post};
    - descrição: caso esteja criando o post não precisa enviar o _id, sera retornado os dados da imagem, esses dados precisam devem ser salvos no post quando for enviado pra salvar ou apagado com a rota de apagar img Title;
    - response: Erro ou dados da imagem.

* Deletar imagem de titulo
 - endereço: /post/imgTitle;
    - método: DELETE;
    - request: json{key: a key da imagem, id: id do post};
    - descrição: caso esteja criando o post não precisa enviar o id;
    - response: Erro ou mensagem de sucesso.

* Adicionar imagem no conteudo
 - endereço: /post/imgBody;
    - método: POST;
    - request: {file: com o arquivo de foto até 2mb, _id: id do post};
    - descrição: caso esteja criando o post não precisa enviar o _id, sera retornado os dados da imagem, esses dados precisam devem ser salvos no post quando for enviado pra salvar ou apagado com a rota de apagar img Body, sera salvo num array junto com as outras;
    - response: Erro ou dados da imagem.

* Deletar imagem de body
 - endereço: /post/imgBody;
    - método: DELETE;
    - request: {_id: id do post, imgTitle:{key: key da imagem}};
    - descrição: caso esteja criando o post não precisa enviar o id;
    - response: Erro ou mensagem de sucesso.

### Rotas para trabalhar com comentário:
* Criar comentário
    - endereço: /comment/comment;
    - método: POST;
    - request: json com {idPost, author:{ name, lastName, nickName urlProfilePic}, content};
    - response: Erro ou comentário.

* Pegar comentário por Id
    - endereço: /comment/comment;
    - método: GET;
    - request: json com {id: id do comentário};
    - response: Erro ou comentário.

* Pegar comentário por post
    - endereço: /comment/forPost;
    - método: GET;
    - request: json com {idPost: id do post};
    - response: Erro ou comentários.

* Pegar comentário por usuário
    - endereço: /comment/forUser;
    - método: GET;
    - request: json com {idUser: id do usuario};
    - response: Erro ou comentários.

* Deletar comentário
    - endereço: /comment/comment;
    - método: DELETE;
    - request: json com {idUser: id do usuario};
    - response: Erro ou mensagem de sucesso.

* Editar comentário
    - endereço: /comment/comment;
    - método: PATCH;
    - request: json com {id: id do comentário, content};
    - descrição: Só é possivel modificar o conteudo do comentário, para modificar a imagem tem sua rota especifica ;
    - response: Erro ou comentário.

* Adicionar imagem no comentário
    - endereço: /comment/comment;
    - método: POST;
    - request: {file: com o arquivo de foto até 2mb, id: id do comentário};
    - descrição: caso esteja criando o comentário não precisa mandar o id, mas envie os dados que serão retornados quando for criar o comentário;
    - response: Erro ou imagem/comentário.

* deletar imagem de comentário
    - endereço: /comment/comment;
    - método: DELETE;
    - request: json com {id: id do comentário, key};
    - descrição: caso esteja criando o comentário não precisa mandar o id;
    - response: Erro ou mensagem de sucesso.

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