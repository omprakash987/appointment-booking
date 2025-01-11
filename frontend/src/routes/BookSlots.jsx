import React, { useEffect, useState } from 'react';
import axios from '../lib/axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { userStore } from '../store/userStore';
import { apointmentStore } from '../store/apointmentStore';


const BookSlots = () => {
const navigate = useNavigate(); 
  
  const {user}  = userStore(); 
  const {createAppointment,loading} = apointmentStore(); 
const studentId = user._id;
  const {professorId} = useParams(); 
  console.log("professor id : ", professorId)

  const [date,setDate] = useState(''); 
  const [time,setTime] = useState(''); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    createAppointment(studentId,professorId,date,time); 
    navigate('/')
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
      
        <div>
          <label htmlFor="date" className="block font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            name="date"
            onChange={(e)=>setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="time" className="block font-medium mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            name="time"
            onChange={(e)=>setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Appointment'}
        </button>
      </form>
      
    </div>
  );
};

export default BookSlots;
