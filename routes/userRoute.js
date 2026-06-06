const express = require("express");
const user = require("../models/User");
const { getUserProfile, getEditProfileForm, UpdateProfile } = require("../controllers/userController");
const { ensureAuthenticated } = require("../middlewares/auth");
const upload = require("../config/multer");

const userRoute = express.Router();

//Render profile page
userRoute.get('/profile', ensureAuthenticated, getUserProfile);
userRoute.get('/edit', ensureAuthenticated, getEditProfileForm);
userRoute.post('/edit', ensureAuthenticated,upload.single("profilePicture"), UpdateProfile);

module.exports = userRoute;