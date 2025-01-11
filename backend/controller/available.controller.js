import Available from "../models/availability.model.js";
import mongoose from "mongoose";

export const available = async(req,res)=>{
   try {
    const {startTime,endTime} = req.body; 
    
    if(!startTime && !endTime){
        console.log("error : all fields are required"); 
        res.status(404).json({
            message:"all fields are required"
        })
    }

    const availability = await Available.create({
       professorId:req.user._id,
        startTime, 
        endTime,
    })
    
    res.status(200).json({
        message:"avaliiblity created successfull",
        availability,
    })
    
   } catch (error) {
    console.log("error : " , error); 
    res.status(500).json({
        message:"internal server error"
    })
   }

}


export const getAvailableSlotes = async(req,res)=>{
    try {

        // const {professorId} = req.params;
        // if (!mongoose.Types.ObjectId.isValid(professorId)) {
        //     return res.status(400).json({ message: 'Invalid professor ID' });
        //   }

        const availableSlots = await Available.find({
            // professorId,
            isBooked:false,
           
        }).populate('professorId','name')

        res.json({availableSlots}); 
        
    } catch (error) {
        console.log("error : ", error); 
        res.status(500).json({
            message:"internal server error from available slotes"
        })
    }
}