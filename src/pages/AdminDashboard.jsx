import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getCurrentToken } from '../features/authSlice';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function AdminDashboard() {
  const { access } = useSelector(getCurrentToken)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editedUserData, setEditedUserData] = useState({})
  const [newUser, setNewUser] = useState({ username: "", password: "", email : "", role: "" })
  const navigate = useNavigate()

  if(!access){
    navigate("/login")
  }

  // DELETE functionality
  const handleDelete = async (e, id) => {
    e.preventDefault()
    try {
      await axiosInstance.delete(`/users/${id}/`, {
        headers: { Authorization: `Bearer ${access}` }
      })
      setUsers(users.filter(u => u.id !== id))
      setError(null)
    } catch (error) {
        if(error.status === 401){
          navigate("/login")
        }else{
          setError(error.response?.data)
        }
    }
  }

  // Update button click -> toggle editing
  const handleUpdate = (e, user) => {
    e.preventDefault()
    if(editingUserId === user.id) {
      // already in edit mode -> submit changes
      handleSubmitUpdate(user.id)
    } else {
      setEditingUserId(user.id)
      setEditedUserData({...user}) // clone user data
    }
  }

  // Input change handler for editing
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmitUpdate = async (id) => {
    try {
      const res = await axiosInstance.patch(`/users/${id}`, editedUserData, {
        headers: { Authorization: `Bearer ${access}` }
      })
      setUsers(users.map(u => (u.id === id ? res.data : u)))
      setEditingUserId(null)
      setEditedUserData({})
      setError(null)
    } catch (error) {
        if(error.status === 401){
          navigate("/login")
        }else{
          setError(error.response?.data)
        }
    }
  }

  const handleNewUserChange = (e) => {
    const { name, value } = e.target
    setNewUser(prev => ({ ...prev, [name]: value }))
  }

  const handleCreateUser = async (e) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post(`/register`, newUser, {
        headers: { Authorization: `Bearer ${access}` }
      })
      setUsers([...users, res.data])
      setNewUser({ username: "", password : "", email:"",  role: "" })
      setError(null)
    } catch (error) {
        if(error.status === 401){
          navigate("/login")
        }else{
          setError(error.response?.data)
        }
    }
  }

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const res = await axiosInstance.get("/users", {
          headers : {Authorization : `Bearer ${access}`}
        })
        setUsers(res.data)
      } catch (error) {
        if(error.status === 401){
          navigate("/login")
        }else{
          setError(error.response?.data)
        }
      }
    }
    fetchUsers()
  },[])

  return ( users ?  
    <div>
      { error && <ErrorMessage message={error} />}

      <h2 className="text-xl font-bold mb-4">Manage Users</h2>

      {/* New User Form */}
      <form onSubmit={handleCreateUser} className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="font-semibold mb-2">Create New User</h3>
        <div className="flex gap-2">
          <input 
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleNewUserChange}
            className="border p-2 flex-1"
            required
          />

          <input 
            type="password"
            name="password"
            placeholder="abdc@1234"
            value={newUser.password}
            onChange={handleNewUserChange}
            className="border p-2 flex-1"
            required
          />

          <input 
            type="text"
            name="email"
            placeholder="test@gmail.com"
            value={newUser.email}
            onChange={handleNewUserChange}
            className="border p-2 flex-1"
            
          />
          <select 
            name="role"
            value={newUser.role}
            onChange={handleNewUserChange}
            className="border p-2"
            required
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="MANAGER">Manager</option>
            <option value="EMPLOYEE">Employee</option>
          </select>
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </form>

      {/* User Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>

              {/* Username field */}
              <td className="p-2 border">
                {editingUserId === u.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editedUserData.username || ""}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  u.username
                )}
              </td>

              {/* Role field */}
              <td className="p-2 border">
                {editingUserId === u.id ? (
                  <select
                    name="role"
                    value={editedUserData.role || ""}
                    onChange={handleInputChange}
                    className="border p-1"
                  >
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">Employee</option>
                  </select>
                ) : (
                  u.role
                )}
              </td>

              <td className="p-2 border">
                {editingUserId === u.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedUserData.email || ""}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  u.email
                )}
              </td>

              <td className="p-2 border">
                <div className='flex flex-row justify-around'>
                  <button 
                    className='bg-green-500 px-2 py-1 rounded'
                    onClick={(e) => handleUpdate(e, u)}
                  >
                    {editingUserId === u.id ? "Submit" : "Update"}
                  </button>
                  <button
                    className='bg-red-500 px-2 py-1 rounded'
                    onClick={(e) => handleDelete(e,u.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
    
    : <h2>Loading.... </h2>
  );
}

export default AdminDashboard
