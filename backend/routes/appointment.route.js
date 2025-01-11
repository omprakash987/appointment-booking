import { Router } from "express";
import { createAppointment ,getAppointment,cancleAppointment} from "../controller/appointment.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router(); 

router.post("/appointment",protectRoute,createAppointment); 
router.patch("/appointments/:appointmentId/cancel",protectRoute,cancleAppointment); 
router.get('/appointment',protectRoute,getAppointment); 

export default router; 