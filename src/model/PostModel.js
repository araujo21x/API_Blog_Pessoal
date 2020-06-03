class PostModel {
    constructor(post, idAuthor) {
        this._post = {
            _id: post._id,
            title: post.title,
            imgTitle: !post.imgTitle ? null : {
                name: !post.imgTitle.originalname ? post.imgTitle.name : post.imgTitle.originalname,
                size: post.imgTitle.size,
                key: post.imgTitle.key,
                url: post.imgTitle.location,
            },
            author: !post.author ? null : {
                _idAuthor: idAuthor,
                name: post.author.name,
                lastName: post.author.lastName,
                nickName: post.author.nickName,
                urlProfilePic: post.author.urlProfilePic
            },
            imgBody: !post.imgBody ? [] : post.imgBody,
            content: post.content,
            dateCreation: post.dateCreation,
            dateUpDate: post.dateUpDate,
        }
    };

    get() {
        return this._post;
    }

    editPost() {
        let newPost = {};
        if(this._post.title) newPost.title = this._post.title;
        if(this._post.author) newPost.author = this._post.author;
        if(this._post.content) newPost.content = this._post.content;
        newPost.dateCreation = Date.now();

        return {id: this._post._id, newPost: newPost};

    }
}

module.exports = PostModel;