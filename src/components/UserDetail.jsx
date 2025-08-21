import { clearCredentials } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function UserDetail({profile, isSettings}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        dispatch(clearCredentials())
        navigate("/login")
    }
  return (
    <div className=" bg-indigo-50 shadow-lg rounded-2xl p-8 w-[400px]">
        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
            {profile.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.username}</h2>
            <span className={`px-3 py-1 text-xs rounded-full ${
              profile.role === "ADMIN" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
            }`}>
              {profile.role}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 text-gray-700 ">
            <p className=' text-end'>
                <span>{profile.email}</span>
            </p>
        </div>

        {/* Actions */}
        {isSettings && <div className="mt-6 flex justify-between">
          <button className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 w-full"
          onClick={handleLogOut}
          >
            Logout
          </button>
        </div>}
      </div>
  )
}

export default UserDetail