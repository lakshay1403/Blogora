const express = require('express')
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//port
const PORT = process.env.PORT || 3000

//start the server
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})
}).catch(()=>{
    console.log("Database connection failed");
});
