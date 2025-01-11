
import {Routes,Route} from 'react-router-dom'
import './App.css'
import Signup from './routes/Signup';
import Login from './routes/Login';
import { userStore } from './store/userStore';
import { useCallback, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './routes/Dashboard';
import Navbar from './components/Navbar';
import { Navigate } from 'react-router-dom';

function App() {
  const {user,checkAuth,checkingAuth } = userStore(); 
  
  const authenticate = useCallback(async()=>{
    checkAuth(); 
  },[checkAuth])

  useEffect(()=>{
authenticate(); 
  },[authenticate])

  return (
    <div>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={!user? <Login />:<Navigate to={'/dashboard'}/>} />
          <Route path="/signup" element={!user? <Signup />:<Navigate to={'/dashboard'}/>} />
          <Route path="/dashboard" element={user ? <Dashboard />:<Login/> }/>
          <Route path="/" element={ user? <Navigate to="/dashboard" />:<Login/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App; 