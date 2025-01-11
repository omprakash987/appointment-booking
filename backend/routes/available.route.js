import { Router } from "express";
import { available, getAvailableSlotes } from "../controller/available.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = Router(); 


router.post('/availability',protectRoute,available); 
router.get('/professors/availability',protectRoute,getAvailableSlotes)

export default router; 