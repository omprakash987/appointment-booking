import {create} from 'zustand'; 
import axios from '../lib/axios';
import toast from  'react-hot-toast'


export const userStore = create((set,get)=>({
    user:null,
    loading:false,
    checkingAuth:true,

    signup:async({name,email,password,role})=>{
        set({loading:true}); 
        try {
            const res = await axios.post(`/auth/signup`,{name,email,password,role}); 
            set({user:res.data,loading:false}); 
            
        } catch (error) {
            set({loading:false}); 
            toast.error(error.response.data.message || "error")
        }
    },
    login:async(email,password)=>{
        set({loading:true}); 
        try {
            const res = await axios.post(`/auth/login`,{email,password}); 
            console.log("res.data  login: " ,res.data); 
            set({user:res.data,loading:false});
            
        } catch (error) {
            console.log("error : ", error); ;
            set({loading:false}); 
            toast.error("error while login")
        }
    },
    checkAuth:async()=>{
       try {
        set({checkingAuth:true}); 
        const res = await axios.post(`/auth/profile`);
        set({user:res.data,checkingAuth:false}); 
       } catch (error) {
        console.log("error : ", error); 
        set({checkingAuth:false,user:null})
       }

    },
    getProfessorId: async () => {
        try {
          const res = await axios.get(`/students/${user.id}/professor`);
          return res.data.professorId;
        } catch (error) {
          console.error("Failed to fetch professor ID:", error);
          return null;
        }
      },
    logout:async()=>{
       try {
        const res = await axios.post(`/auth/logout`); 
        set({user:null})
        
       } catch (error) {
        console.log("error : ", error); 
        toast.error("error : ", error)
       }
    }
    
}))