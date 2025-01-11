import {mongoose} from "mongoose";

const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  availabilityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Available', required: true },
  status: { type: String, enum: ['scheduled', 'cancelled'], default: 'scheduled' }
  
},{timestamps:true});

const Appointment = mongoose.model('Appointment', appointmentSchema);


export default Appointment; 
