const express = require("express");
const user = require("../models/User");
const { getUserProfile } = require("../controllers/userController");
const { ensureAuthenticated } = require("../middlewares/auth");


const userRoute = express.Router();

//Render profile page
userRoute.get('/profile', ensureAuthenticated, getUserProfile);

module.exports = userRoute;