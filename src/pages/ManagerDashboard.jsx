import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCurrentToken } from "../features/authSlice";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import ErrorMessage from "../components/ErrorMessage";

const ManagerDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('')
  const { access } = useSelector(getCurrentToken)
  const navigate = useNavigate()

  useEffect(() => {
    if(!access){
      navigate("/login")
    }
    const fetchUsers = async() => {
      await axiosInstance.get("/users", {
        headers : {Authorization : `Bearer ${access}`}
      }).then((res) => setEmployees(res.data))
      .catch((error) => {
        if (error.status === 401){
          navigate("/login")
        }else{
          setError(error.response?.data)
        }
      })
    }
    fetchUsers()
  },[])

  return (
    employees ? 
      <div>
      {error && <ErrorMessage message={error}/>}
        <h2 className="text-xl font-bold mb-4">Employees</h2>
        <div className="flex flex-row gap-5">
          {employees.map((e) => (
            <UserDetail key={e.id} profile={e} isSettings={false} />
          ))}
        </div>
      </div>
    : <h2>Loading.... </h2>
  );
};

export default ManagerDashboard;
