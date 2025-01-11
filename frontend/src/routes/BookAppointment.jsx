import React,{useEffect} from 'react'
import { apointmentStore } from '../store/apointmentStore'

import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userStore } from '../store/userStore';



const BookAppointment = () => {
  const navigate = useNavigate() ; 
  const {getAvailableSlotes,availableSlotes,loading} = apointmentStore(); 
  const {user} = userStore(); 
  const studentId = user._id; 
  useEffect(()=>{
    getAvailableSlotes(); 
  },[])
  const handleApointment = ()=>{
    navigate(`/book-slots/${availableSlotes._id}`)
    
  }
  return (
    <div className="max-w-4xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
    {availableSlotes && availableSlotes.length > 0 ? (
      availableSlotes.map((slot) => (
        <div
          key={slot._id}
          className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-blue-600">
            Professor: {slot.professorId.name}
            {console.log("professor name : ", slot.professorId._id)}
          </h3>
          <p className="text-sm text-gray-500">
            Date: {new Date(slot.date).toDateString()}
          </p>
          <ul className="mt-2 space-y-2">
            {slot.timeSlotes.map((timeSlot) => (
              <li
                key={timeSlot._id}
                className={`p-2 rounded-md ${
                  timeSlot.isBooked
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'
                }`}
              >
                {timeSlot.time} -{' '}
                <span className="font-medium">
                  {timeSlot.isBooked ? 'Booked' : 'Available'}
                </span>
              </li>
            ))}
          </ul>
          <div>
          <Link to={`/book-slots/${slot.professorId._id}/${studentId}`}>book</Link>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-600">No slots available.</div>
    )}
  </div>
  )
}

export default BookAppointment