const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Cloudinary = require("cloudinary").v2;
const File = require("../models/File");

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


exports.getEditProfileForm = asyncHandler( async(req,res) => {
    const user = await User.findById(req.user._id).select("-password");
    if(!user){
        return res.render("login",{
            title: "Login",
            user: req.user,
            error: "User not found",
        });
    }
    res.render("editProfile",{
        title: "Edit Profile",
        user,
        error: "",
    });
});

exports.UpdateProfile = asyncHandler(async(req,res) => {
    const {username, email, bio} = req.body;
    const user = await User.findById(req.user._id).select("-password");
    if(!user){
        return res.render("login", {
            title: "Login",
            user: req.user,
            error: "User not found",
        });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    if(req.file){
        if(user.profilePicture && user.profilePicture.public_id){
            await Cloudinary.uploader.destroy(user.profilePicture.public_id);
        }
        const file = await new File({
        url: req.file.path,
        public_id: req.file.filename,
        uploaded_by: req.user._id,
    })
    await file.save();
    user.profilePicture = {
        url: file.url,
        public_id: file.public_id,
    };
    }
    await user.save();
    res.render("editProfile",{
        title: "Edit Profile",
        user,
        error: "",
        success: "Profile updated successfully",
    });
});