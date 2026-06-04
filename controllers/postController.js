const Post = require("../models/Post");
const File = require("../models/File");
const asyncHandler = require("express-async-handler");

exports.getPostForm = asyncHandler((req,res) => {
    res.render("newPost", {
        title: "Create Post",
        user: req.user,
        error: "",
        success: ""
    });
});

//Creating a new post

exports.createPost = asyncHandler(async (req,res) =>{
    const {title, content} = req.body;
    //validation
    if(!req.files || req.files.length === 0){
        return res.render("newPost", {
            title: "Create Post",
            user: req.user,
            error: "At least one image is required",
            success: "",
        });
    }
    const images = await Promise.all(req.files.map(async(file)=>{
        //save the images into our database
        const newFile = new File({
            url: file.path,
            public_id: file.filename,
            uploaded_by: req.user._id,
        });
        await newFile.save();
        console.log(newFile);
        return {
            url: newFile.url,
            public_id: newFile.public_id,
        };
      })
    );
    //create post
    const newPost = new Post({
        title,
        content,
        author: req.user._id,
        images,
    });
    await newPost.save();
    res.render("newPost",{
        title: "Create Post",
        user: req.user,
        error: "",
        success: "Post created successfully",
    });
});

//Get all posts
exports.getPosts = asyncHandler(async (req,res) => {
    const posts = await Post.find().populate("author","username");

    res.render("posts", {
        title: "Posts",
        posts,
        user: req.user,
        error : "",
        success: "",
    });
});

//get Post by id

exports.getPostById = asyncHandler (async (req,res) => {
    const post = await Post.findById(req.params.id).populate("author", "username").populate({
        path: "comments",
        populate:{
            path: "author",
            model: "User",
            select: "username",
        },
    });
    res.render("postDetails", {
        title: "Posts",
        post,
        user: req.user,
        success: "",
        error: "",
    });
});


//get edit post form
exports.getEditPostForm = asyncHandler(async(req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.render("postDetails",{
            title: "Post",
            post,
            user: req.user,
            error: "Post not found",
            success: "",
        });
    }
    res.render("editPost",{
        title: "Edit Post",
        post,
        user: req.user,
        error: "",
        success: "",
    });
});
