import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';


export const protectRoute = async(req,res,next)=>{
   try {
    const token = req.cookies.token; 
    console.log("token from protect route", token); 
   
    if(!token){
       return res.status(404).json({
            message:"unauthorized ye vala hai "
        })
    }

    const decoded =  jwt.verify(token,process.env.TOKEN_SECRET); 
    const user = await User.findById(decoded.userId)

    if(!user){
       return res.status(400).json({
            message:"anauthorized"
        })
    }

    req.user = user; 
    next(); 
    
   } catch (error) {
    console.log("error : " , error); 
    res.status(500).json({
        message:"internal server error "
    })
   }

}