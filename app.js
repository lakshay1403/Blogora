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
//passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//EJS
app.set("view engine", "ejs");

//routes
app.use("/auth", userRoute);

//start the server
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
}).catch(()=>{
    console.log("Database connection failed");
});
