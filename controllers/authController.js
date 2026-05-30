
//Get login page
exports.getLogin = (req,res) => {
    res.render("login");
}

//Login Logic
exports.Login = async (req,res) => {
    const {email, password} = req.body;
    try {
        //find user
        const user = await User.findOne({ email });
        const isMatch = await User.findOne({password});

        if(user && isMatch){
            res.send("login success");
        }
        else{
            res.send("login failed");
        }
    } catch (error) {
        res.send(error);
    }
}

//Get Register page
exports.getRegister = (req,res)=>{
    res.render("register");
}


//logic for user Registration
exports.register = async (req,res) => {
    const {username, email, password} = req.body;
    try{
        //check is user exists
        const user = await User.findOne({email});

        if(user){
            res.send("user already exists");
        }
        else{
            //create new user
            const newUser = new User({
                username,
                email,
                password,
            });
            //save user
            await newUser.save();
            //redirect to login page
            res.redirect("/auth/login");
        }
        res.send("registering user");
    }catch(error){
        res.send(error);
    }
}
