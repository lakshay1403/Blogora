const User = require("../models/User");
const bcrypt = require('bcryptjs')
const passport = require("passport");
const asyncHandler = require("express-async-handler");

//Get login page
exports.getLogin = asyncHandler((req,res) => {
    res.render("login",{
        title: "Login",
        error: "",
        user: req.user || null,
    });
});

//Login Logic
exports.Login = asyncHandler(async (req, res, next) => {
    passport.authenticate(
        "local", (err, user, info)=>{
            if(err){
                return next(err);
            }
            if(!user){
                return res.render("login", {
                    title: "Login",
                    user: req.user || null,
                    error: info.message,
                });
            }
            req.login(user, (err) =>{
                if(err) {
                    return next(err);
                }
                return res.redirect("/user/profile");
            });
        })(req,res,next)
});

//Get Register page
exports.getRegister = asyncHandler((req,res)=>{
    res.render("register",{
        title: "Register",
        user: req.user,
        error: "",
    });
});


//logic for user Registration
exports.register = asyncHandler(async (req,res) => {
    const {username, email, password} = req.body;
    try{
        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.render("register",{
                title: "Register",
                user: req.user,
                error: "User already exists",
            });
        }
        //hash the user password
       
        const hashedPassword = await bcrypt.hash(password,10);
        //save user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        
        res.redirect("/auth/login");
    }catch(error){
        res.render("register",{
        title: "Register",
        user: req.user,
        error: error.message,
        });
    }
});

//Logout logic 
exports.logout = asyncHandler((req,res,next) => {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/auth/login');
    });
});