const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

//port
const PORT = process.env.PORT || 3000
//middlewares: passing form data
app.use(express.urlencoded({extended: true}));

//EJS
app.set("view engine", "ejs");

//routes
//Render login page
app.get("/auth/login",(req,res) =>{
    res.render("login");
});

//Main logic for user login
app.post("/auth/login", async (req,res) => {
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
})

//Render Register page
app.get("/auth/register", (req,res)=>{
    res.render("register");
});

//Main logic for user registration
app.post("/auth/register",async (req,res) => {
    const {username, email, password} = req.body;
    try{
        //check is user exists
        const user = await User.findOne({email});

        if(user){
            res.send("user already exists");
        }
        else{
            //create new user
            const newUser = new User({
                username,
                email,
                password,
            });
            //save user
            await newUser.save();
            //redirect to login page
            res.redirect("/auth/login");
        }
        res.send("registering user");
    }catch(error){
        res.send(error);
    }
})

//start the server
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
}).catch(()=>{
    console.log("Database connection failed");
});
