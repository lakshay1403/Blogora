const express = require('express')
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const userRoute = require("./routes/authRoutes");
require('dotenv').config();

//port
const PORT = process.env.PORT || 3000
//middlewares: passing form data
app.use(express.urlencoded({extended: true}));

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
