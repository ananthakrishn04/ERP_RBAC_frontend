import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../api/axiosInstance";
import { getCurrentToken } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import UserDetail from "../components/UserDetail";
import ErrorMessage from "../components/ErrorMessage";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null)
  const { access } = useSelector(getCurrentToken)
  const navigate = useNavigate()

  useEffect(() => {
    if(!access){
      navigate("/login")
    }
    const fetchUsers = async() => {
      await axiosInstance.get("/profile", {
        headers : {Authorization : `Bearer ${access}`}
      }).then((res) => setProfile(res.data))
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

  return ( profile ?
      <div>
       {error && <ErrorMessage message={error}/>}
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <UserDetail profile={profile} isSettings={true} />
        </div>
      </div>

    : <h2>Loading.... </h2>
  );
};

export default Profile;
