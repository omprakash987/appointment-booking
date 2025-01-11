import Appointment from '../models/appointment.model.js';
import Available from '../models/availability.model.js';

export const createAppointment = async(req , res)=>{
    try {
       const {availabilityId,professorId} = req.body; 
       if(!professorId){
        res.status(400).json({
            message:"professorId is not defined"
        })
       }
       const availability = await Available.findById(availabilityId); 
       if(!availability || availability.isBooked){
        throw new Error("slots not available ")
       }

       const appointment = await Appointment.create({
        studentId:req.user._id,
        professorId,
        availabilityId,
        isBooked:false,
       })
       availability.isBooked = true; 
       await availability.save(); 

       res.status(200).json({
        message:"appointment created successfull",
        appointment
       })


} catch (error){
        console.log("error : ", error); 
        res.status(500).json({
            message: " internal server error"
        })
    }
}

export const getAppointment = async(req , res)=>{
   try {

    const filter = req.user.role === 'professor'
    ? {professorId:req.user._id}:{studentId:req.user._id}

console.log("filter data : ", filter); 
   const appointment = await Appointment.find({
    ...filter,
    status:'scheduled'
   }).populate('professorId availabilityId studentId','name startTime');
   
   res.status(200).json({
    appointment,
    message:"appointment got successfull"
   })
   } catch (error) {
    console.log("error : ", error); 
    
    res.status(500).json({
        message:"internal server error "
    })
   }
}

export const cancleAppointment = async(req,res)=>{
    try {
        const appointmentId = req.params.appointmentId; 
        if(!appointmentId){
            return res.status(400).json({
                message:"appointment id not found"
            })
        }

        const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

        if (req.user.role === 'professor' && appointment.professorId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Unauthorized",
              });
          }
          appointment.status = 'cancelled'; 
          await appointment.save(); 

          const availability = await Available.findById(appointment.availabilityId); 
          availability.isBooked = false; 
          await availability.save();
        
          res.json({
            message:"appointment cancelled successfull",
            appointment
          })
          
        
    } catch (error) {
        console.log("error from cancelled appointment : ", error); 
        res.status(500).json({
            message:"internal server error"
        })
    }
}