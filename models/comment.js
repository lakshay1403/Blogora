const mongoose = require('mongoose');


//schema
const FileSchema = new mongoose.Schema({
    content:{
            type: String,
            required: true,
        },
    post:{
            type: mongoose.Schema.type.ObjectId,
            required: true,
            ref: "Post",
        },
    author: {
        type: mongoose.Schema.type.ObjectId,
        required: true,
        ref: "User",
    },
},{
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports  = Comment;