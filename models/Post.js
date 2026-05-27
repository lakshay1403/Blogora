const mongoose = require('mongoose');

//schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
            type: mongoose.Schema.type.ObjectId,
            required: true,
    },
    images: [{
        url: {
            type: String,
            required: true,
        },
        public_id:{
            type: String,
            required: true
        },
    }],
    comments: [{
        type: mongoose.Schema.type.ObjectId,
        ref: 'Comment',
    }],
},{
    timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports  = Post;