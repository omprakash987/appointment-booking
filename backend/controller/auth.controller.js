import User from "../models/user.model.js";
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'


const generateToken = async(userId,res)=>{
    const token = jwt.sign({userId},process.env.TOKEN_SECRET,{
        expiresIn:'7d'
    })
    console.log("token : ", token); 
  
    res.cookie('token',token,{
        httpOnly:true,
        sameSite:"strict",
        maxAge:15*60*60*1000,
    })
}

export const signup = async(req , res)=>{
  try {
    const {name,email,password,role} = req.body; 
    if(!name && !email && !password && !role){
        console.log("error : all fields are required "); 
        res.status(404).json({
            message:"all fields are required"
        })
    }

    const existing =await User.findOne({email}); 
    if(existing){
        console.log("error user already exist"); 
        res.status(500).json({
            message:"user already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10); 
    const user = await User.create({
        name,email,password:hashedPassword,role
    }); 

 await generateToken(user._id,res);
   await user.save(); 

    res.status(200).json({
        user,
        message:"user created successfully",
    })
    
  } catch (error) {
    console.log("error : ", error); 
    res.status(500).json({
        message:"internal server error from signup "
    })
  }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = req.body; 
    if(!email&&!password){
        console.log("all fileds are required"); 
       return res.status(400).json({
            message:"all fileds are required"
        })
    }
    const user = await User.findOne({email}); 

    if(!user){
        console.log("user not exist"); 
        res.status(404).json({
            message:"user not found"
        })
    }
  await  generateToken(user._id,res); 

  res.status(200).json({
    user,
    message:"user login successfull",
    
  }) 
    } catch (error) {
        console.log("error : ", error); 
        res.status(500).json({
            message:"internal server error"
        })
    }
}

export const  getProfile = async(req,res)=>{
    try {
        res.json(req.user); 
        
    } catch (error) {
        console.log("error from getprofile : ", error); 
    }
}

export const logout = async(req , res)=>{
   res.clearCookie('token'); 
   res.status(200).json({
    message:"logout successfull"
   })
}