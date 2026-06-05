const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

//get user Profile
exports.getUserProfile = asyncHandler( async(req,res) => {
    //find the user
    const user = await User.findById(req.user._id).select("-password");
    if(!user){
        res.render("login",{
            title: "Login",
            user: req.user,
            error: "User not found",
        });
    }

    //fetch user posts
    const posts = await Post.find({author: req.user._id}).sort({
        createdAt: -1,
    });

    res.render("profile",{
        title: "Profile",
        user,
        posts,
        error: "",
        postCount: posts.length, 
    })
})
