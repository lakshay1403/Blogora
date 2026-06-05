const express = require("express");
const { getLogin, Login, getRegister, register, logout } = require("../controllers/authController");
const authRoute = express.Router();


//Render login page
authRoute.get("/login",getLogin);

//Main logic for user login
authRoute.post("/login",Login);

//Render Register page
authRoute.get("/register",getRegister);

//Main logic for user registration
authRoute.post("/register",register);

//logout
authRoute.get('/logout', logout);
module.exports = authRoute;
