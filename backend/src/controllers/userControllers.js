const User=require('../models/Usermodel');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

// Register a new user
exports.registerUser=async(req,res)=>{
    const {username,email,password}=req.body;

    try {
        // Check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        // Hash the password
    
        const hashedPassword=await bcrypt.hash(password,10);

        // Create a new user
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword
        });
        res.status(201).json({message:"User registered successfully", user:newUser});
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
    }
}


exports.loginUser=async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.cookie('token',token)
        res.status(200).json({message:"Login successful",user,token});

        
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
        
    }
}


// Logout user
exports.logoutUser=(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:"Logout successful"});
}

// Get user profile
exports.getUserProfile=async(req,res)=>{
    try {
        const user=await User.find({_id: { $ne: req.user._id }}).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User retrieved successfully", user});
    } catch (error) {
        res.status(500).json({message:"Server error", error:error.message});
    }
}

//_id: { $ne: req.user._id }}).