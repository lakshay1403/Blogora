require('dotenv').config();
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const {MongoStore} = require("connect-mongo")
console.log(typeof MongoStore.create);
const userRoute = require("./routes/authRoutes");
const passportConfig = require('./config/passport');
const passport = require('passport');
const session = require("express-session");
const postRoutes = require('./routes/postRoute');
const errorHandler = require('./middlewares/errorHandler');
const commentRoute = require('./routes/CommentRoute');
const methodOverride = require("method-override");
//port
const PORT = process.env.PORT || 3000
//middlewares: passing form data
app.use(express.urlencoded({extended: true}));

//session middleware
app.use(session({
    secret: "Keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL}),
   })
);
//method override middleware
app.use(methodOverride('_method'));
//passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//EJS
app.set("view engine", "ejs");

//Home Route
app.get("/", (req,res) => {
    res.render("home", {
        user: req.user,
        error:"",
        title: "Home",
    });
})
//routes
app.use("/auth", userRoute);
app.use("/posts", postRoutes);
app.use("/", commentRoute);

//error handler
app.use(errorHandler);

//start the server
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
}).catch(()=>{
    console.log("Database connection failed");
});
