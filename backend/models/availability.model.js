import mongoose from "mongoose";

const AvailabilitySchema = await mongoose.Schema({
    professorId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    isBooked: { type: Boolean, default: false }
    
},{timestamps:true}); 

const Available = mongoose.model('Available',AvailabilitySchema); 

export default Available;