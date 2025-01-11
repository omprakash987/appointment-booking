import { Router } from "express";
import {login, signup,getProfile,logout} from '../controller/auth.controller.js'
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router(); 

router.post('/signup', signup); 
router.post('/login',login); 
router.post('/logout',logout); 
router.post('/profile',protectRoute,getProfile); 


export default router; 
