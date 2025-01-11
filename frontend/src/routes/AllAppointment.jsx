import React, { useEffect } from 'react'
import { apointmentStore } from '../store/apointmentStore'

const AllAppointment = () => {
    const {getAllAppointment,apointment} = apointmentStore(); 
    console.log("appointments from all appointments : ", apointment)

    useEffect(()=>{
        getAllAppointment()
    },[])

  return (
   <div>
    all appointment

   </div>
  )
}

export default AllAppointment