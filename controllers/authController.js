const User = require("../models/User");
const bcrypt = require('bcryptjs')
const passport = require("passport");

//Get login page
exports.getLogin = (req,res) => {
    res.render("login",{
        title: "Login",
        error: "",
        user: req.user || null,
    });
};

//Login Logic
exports.Login = async (req,res,  next) => {
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
                return res.redirect("/");
            });
        })(req,res,next)
};

//Get Register page
exports.getRegister = (req,res)=>{
    res.render("register",{
        title: "Register",
        user: req.user,
        error: "",
    });
};


//logic for user Registration
exports.register = async (req,res) => {
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
};

//Logout logic 
exports.logout = (req,res,next) => {
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/auth/login');
    });
}