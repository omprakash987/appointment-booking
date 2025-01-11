
import { create } from "zustand";
import axios from '../lib/axios'; 
import toast from "react-hot-toast";

export const apointmentStore = create((set,get)=>({
    availableSlotes:[],
    loading:false,
    apointment:[],

    getAvailableSlotes:async()=>{
        set({loading:true}); 
        try {
            const res = await axios.get(`/professors/availability`); 
            console.log("slotes data : ", res.data.availableSlots);
            set({availableSlotes:res.data.availableSlots,loading:false})
            
        } catch (error) {
          console.log("error : ", error); 
            set({loading:true}); 
            toast.error(error.response?.data?.error || "Failed to fetch available slots");
        }
    },
    createAvailability: async (startTime, endTime) => {
        try {
          const response = await axios.post(
            '/availability',
            { startTime, endTime },
          );
          set(state => ({
            availableSlotes: [...state.availableSlotes, response.data]
          }));
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    createAppointment:async(availabilityId,professorId)=>{
        try {
            const response = await axios.post(
              '/appointment',
              { availabilityId, professorId },
            );
            return response.data;
          } catch (error) {
            throw error;
          }
    },
    getAllAppointment:async()=>{
        try {
            const res = await axios.get(`/appointment`); 
            console.log("appointment data : ", res); 
            set({loading:false,apointment:res.data?.appointment}); 
            
        } catch (error) {
            set({loading:false}); 
            console.log("error : ", error); 
            toast.error("error from get appointment")
        }
    },
    cancelAppointment: async (appointmentId) => {
        try {
          const response = await axios.patch(
            `/appointments/${appointmentId}/cancel`,
            {},
          );
          set(state => ({
            apointment: state.apointment.map(apt => 
              apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
            )
          }));
          return response.data;
        } catch (error) {
          throw error;
        }
      },
}))