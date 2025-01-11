import React, { useEffect,useState } from 'react'
import { userStore } from '../store/userStore'
import ProfessorDashboard from '../components/ProfessorDashboard';
import StudentDashboard from '../components/StudentDashboard';
import { apointmentStore } from '../store/apointmentStore';
const Dashboard = () => {
  const [professorId, setProfessorId] = useState(null);
    const {user,checkAuth,checkingAuth} = userStore(); 
    console.log("professorId : ", user.role==='professor'?user._id:"not yet loaded")
    const {availableSlotes, getAvailableSlotes} = apointmentStore(); 

useEffect(()=>{
  const authenticate = async()=>{
   await checkAuth(); 
   await getAvailableSlotes(); 
  }
  authenticate(); 
},[checkAuth,getAvailableSlotes])

    useEffect(() => {
      console.log("user flow: ", user);
      if (user?.role === "student" && Array.isArray(availableSlotes) && availableSlotes.length > 0) {
        console.log("ahfaksdfj ak d: ",availableSlotes[0].professorId._id )
        const firstProfessorId = availableSlotes[0].professorId._id; 
        setProfessorId(firstProfessorId);
      }
    }, [user,availableSlotes]);

    if (user?.role === 'professor') {
      return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <ProfessorDashboard />
        </div>
      );
    }

   
    

console.log("professor ki id  ; ", professorId); 
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    {professorId ? (
      
      <StudentDashboard professorId={professorId} />
    ) : (
      <div>NO available data</div>
    )}
  </div>
  )
}

export default Dashboard