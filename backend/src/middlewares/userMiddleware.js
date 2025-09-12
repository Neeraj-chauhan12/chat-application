const jwt = require('jsonwebtoken');
const User = require('../models/Usermodel');


const userMiddleware=async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        user = await User.findById(decoded.id).select('-password');
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({message:"token not found"});
    }
}

module.exports = userMiddleware;

