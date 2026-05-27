const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//port
const PORT = process.env.PORT || 3000

//EJS
app.set("view engine", "ejs");

//routes
app.get("/auth/login",(req,res) =>{
    res.render("login");
});
//Render Register page
app.get("/auth/register", (req,res)=>{
    res.render("register");
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
