const User = require("../models/User");
const bcrypt = require('bcryptjs')
const passport = require("passport");

//Get login page
exports.getLogin = (req,res) => {
    res.render("login");
};

//Login Logic
exports.Login = async (req,res,  next) => {
    passport.authenticate(
        "local", (err, user, info)=>{
            if(err){
                return next(err);
            }
            if(!User){
                return res.render("login", {
                    title: "Login",
                    user: req.username,
                    error: info.message,
                });
            }
            req.Login(user, (err) =>{
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
        user: req.username,
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
                user: req.username,
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
        user: req.username,
        error: error.message,
        });
    }
};
