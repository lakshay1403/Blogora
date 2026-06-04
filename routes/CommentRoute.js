const express = require("express");
const commentRoute = express.Router();
const {ensureAuthenticated} = require("../middlewares/auth");
const { addComment } = require("../controllers/commentController");

//add comment
commentRoute.post('/posts/:id/comments',ensureAuthenticated, addComment);

module.exports = commentRoute;