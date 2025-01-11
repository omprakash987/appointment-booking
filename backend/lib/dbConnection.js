import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'; 

dotenv.config(); 

export const connectToDB = async()=>{
   try {
    const conn = await mongoose.connect(process.env.MONGODB_URL); 
    console.log("mongodb is connected successfull"); 
   } catch (error) {
    console.log("mongodb error : ", error); 
    process.exit(1); 
   }
}