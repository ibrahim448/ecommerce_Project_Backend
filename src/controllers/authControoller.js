const User = require("../models/authModel");
const jwt = require("jsonwebtoken");

const {hashPassword, comparePassword} = require("../helpers/authHelper");


exports.registrationUser = async(req,res)=>{
    try {

        //Destracture Name, Email, Passsword from req body
        const {name, email, password} = req.body;

        //Validation All Field
        if(!name.trim()){
            return res.json({error: "Name is required"});
        };
        
        if(!email.trim()){
            return res.json({error: "Email is required"});
        };

        if(!password || password.length < 6){
            return res.json({error:"Password must be 6 characters required"});
        };

        //Check User by Email
        const exgistingUser = await User.findOne({email});
        if(exgistingUser){
            return res.json({error:"Email is taken"});
        };

        //hashPassword
        const hashedPassword = await hashPassword(password);


        //Create User
        const user = await new User({
            name,
            email,
            password:hashedPassword
        }).save();

        //Token Create
        const token = jwt.sign({_id:user._id}, process.env.JWT_TOKEN, {expiresIn:"7d"});

        //Send response
        res.json({
            user:{
                name: user.name,
                email: user.email,
                role: user.role,
                address: user.address
            },
            token
        });
        
    } catch (error) {
        console.log(error);
    };
};

exports.loginUser = async(req,res)=>{
    try {

        //destructure email password from req body
        const {email, password} = req.body;

        //Validation all field
        
        if(!email){
            return res.json({error:"Email is required"});
        };

        if(!password || password.length < 6){
            return res.json({error:"Password must be 6 characters required"});
        };

        //check user by email
        const user = await User.findOne({email});
        if(!user){
            return res.json({error:"User not found"});
        };

        //match Password

        const matchPassword = await comparePassword(password, user.password);
        if(!matchPassword){
            return res.json({error:"Invalid email or password"});
        };

        //Token create
        const token = jwt.sign({_id:user._id}, process.env.JWT_TOKEN,{expiresIn:"7d"});

        //Send response
        res.json({
            user:{
                name: user.name,
                email: user.email,
                address: user.address,
                role: user.role
            },
            token
        });
        
    } catch (error) {
        console.log(error)
    };
};


exports.allUsers = async(req,res)=>{
    try {
        const user = await User.find({})
        return res.json(user);
        
    } catch (error) {
        console.log(error)
    }
};


exports.updateUser = async(req,res)=>{
    try {

        const {name, password, address} = req.body;
        const user = await User.findById(req.user._id);

        if(password && password.length < 6){
            return res.json({error:"Password must be 6 characters required"});
        };

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const update = await User.findByIdAndUpdate(req.user._id,
        {
            name: name || user.name,
            password: hashedPassword || user.password,
            address: address || user.address
        },
        {new:true}
        );

        update.password = undefined;
        res.json(update);
        
    } catch (error) {
        console.log(error)
    };
};