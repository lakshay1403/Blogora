const express = require("express");
const commentRoute = express.Router();
const {ensureAuthenticated} = require("../middlewares/auth");
const { addComment, getCommentForm, updateComment, deleteComment } = require("../controllers/commentController");

//add comment
commentRoute.post('/posts/:id/comments',ensureAuthenticated, addComment);
//get comment form
commentRoute.get('/comments/:id/edit', getCommentForm)
commentRoute.put('/comments/:id', ensureAuthenticated, updateComment);
commentRoute.delete('/comments/:id', ensureAuthenticated, deleteComment);

module.exports = commentRoute;