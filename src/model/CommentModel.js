

class CommentModel {
    constructor(comment) {
        this._comment = {
            _id: comment._id,
            idPost: comment.idPost,
            author: !comment.author ? null :{
                _idAuthor: comment._idAuthor,
                name: comment.author.name,
                lastName: comment.author.lastName,
                nickName: comment.author.nickName,
                urlProfilePic: comment.author.urlProfilePic
            },
            content: comment.content,
            date: comment.date,
            imageBody: !comment.imageBody ? null : {
                name: !comment.imageBody.originalname ? comment.imageBody.name : comment.imageBody.originalname,
                size: comment.imageBody.size,
                key: comment.imageBody.key,
                url: comment.imageBody.location,
            },

        }
    }

    get(){
        return this._comment;
    }
    
    editComment(){
        let newComment = {};
        if(this._comment.content) newComment.content = this._comment.content;

        return {id: this._comment._id, newComment: newComment};

    }
    
}

module.exports = CommentModel;