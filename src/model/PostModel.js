class PostModel {
    constructor(post, idAuthor) {
        this._post = {
            _id: post._id,
            title: post.title,
            imgTitle: !post.imgTitle ? null : {
                name: !post.imgTitle.originalname ? post.imgTitle.name: post.imgTitle.originalname,
                size: post.imgTitle.size,
                key: post.imgTitle.key,
                url: post.imgTitle.location ,
            },
            author: !post.author ? null: {
                _idAuthor: idAuthor,
                name: post.author.name,
                lastName: post.author.lastName,
                nickName: post.author.nickName,
                urlProfilePic: post.author.urlProfilePic
            },
            content: post.content,
            dateCreation: post.dateCreation,
            dateUpDate: post.dateUpDate,
        }
    };

    get() {
        return this._post;
    } 

}

module.exports = PostModel;