const jwt = require("jsonwebtoken");
const User = require("../models/authModel");


exports.requireSinging = async(req,res,next)=>{
    try {
        const decoded = jwt.verify(req.headers.auth, process.env.JWT_TOKEN);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.json({error:"Unauthorized"});
    };
};

exports.isAdmin = async(req,res,next)=>{
    try {

        const user = await User.findById(req.user._id);
        if(user.role !==1){
            return res.json({error:"Unauthorized"});
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log(error)
    }
};