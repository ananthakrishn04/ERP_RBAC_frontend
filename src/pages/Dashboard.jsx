import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUser } from '../features/authSlice';
import AdminDashboard from './AdminDashboard';
import ManagerDashboard from './ManagerDashboard'
import "../styles/styles.css"
import Navbar from '../components/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

function Dashboard() {
  const { username, role } = useSelector(getUser);
  const navigate = useNavigate()

  useEffect(() => {
    if(!username){
      navigate("/login")
    }
  })
  
  return (
    <div className='m'>
      <div className="p-6">
        {role === "ADMIN" && <AdminDashboard/>}
        {role === "MANAGER" && <ManagerDashboard />}
        {role === "EMPLOYEE" && <Navigate to="/profile" replace />}
      </div>
    </div>
  );
}

export default Dashboard