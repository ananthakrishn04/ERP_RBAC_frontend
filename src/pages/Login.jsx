import React, { useRef, useState } from 'react'
import axiosInstance from '../api/axiosInstance'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/authSlice'
import { Navigate, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'


const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const userRef = useRef()
    const errorRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axiosInstance.post("/login", {username, password})
            dispatch(setCredentials(response.data))
            navigate("/dashboard")

        }catch(error){
            setError(error.response?.data?.detail)
        }
    }

   return (
    <div className=" flex items-center justify-center h-screen bg-blue-300">
      <form
        onSubmit={handleSubmit}
        className=" bg-gray-300 shadow-lg p-6 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500" ref={errorRef}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="border p-2 w-full mb-3 rounded"
          value={username}
          ref={userRef}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-800 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login