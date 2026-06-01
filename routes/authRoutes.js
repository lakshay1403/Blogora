const express = require("express");
const { getLogin, Login, getRegister, register, logout } = require("../controllers/authController");
const userRoute = express.Router();


//Render login page
userRoute.get("/login",getLogin);

//Main logic for user login
userRoute.post("/login",Login);

//Render Register page
userRoute.get("/register",getRegister);

//Main logic for user registration
userRoute.post("/register",register);

//logout
userRoute.get('/logout', logout);
module.exports = userRoute;
