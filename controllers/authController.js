const User = require("../models/User");
const bcrypt = require('bcryptjs')

//Get login page
exports.getLogin = (req,res) => {
    res.render("login");
};

//Login Logic
exports.Login = async (req,res) => {
    const {email, password} = req.body;
    try {
        //find user
        const user = await User.findOne({ email });
        const isMatch = await User.findOne({password});

        if(user && isMatch){
            res.send("login success");
        }
        else{
            res.send("login failed");
        }
    } catch (error) {
        res.send(error);
    }
};

//Get Register page
exports.getRegister = (req,res)=>{
    res.render("register",{
        title: "Register",
        user: req.username,
        error: null
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
