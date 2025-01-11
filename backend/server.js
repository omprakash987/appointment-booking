import express from 'express'; 
import dotenv from 'dotenv'
import authRouters from './routes/auth.route.js'
import { connectToDB } from './lib/dbConnection.js';
import availableRoutes from './routes/available.route.js'
import appointmentRoutes from './routes/appointment.route.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path'; 

dotenv.config(); 
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

const PORT = 8000||process.env.PORT
const __dirname = path.resolve(); 

const app  = express(); 
app.use(cors(corsOptions))
app.use(express.json({limit:'14mb'})); 
app.use(cookieParser()); 
app.get('/',(req,res)=>{
    res.send("hello")
})

app.use('/api/auth',authRouters); 
app.use('/api',availableRoutes); 
app.use('/api',appointmentRoutes); 

if(process.env.NODE === 'production'){
    app.use(express.static(path.join(__dirname,"/frontend/dist"))); 
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend',"dist","index.html"))
})
}

app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`)
    connectToDB();
})