import { useSelector } from 'react-redux';
import { getUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { role } = useSelector(getUser)
    const navigate = useNavigate()

  return (
    <nav className="text-white px-20 py-6 flex justify-between bg-gray-800">
      <h1 className="text-xl font-bold">ERP Portal - RBAC</h1>
      <div className="flex gap-4 items-center">
        <span className="capitalize border-2 border-gray-700 p-1.5 rounded">{role || ""}</span>
        <div className="flex gap-10">
            <button
            onClick={() => navigate("/profile")}
            className="bg-gray-500 rounded py-1.5 px-3 hover:bg-black"
            >
                Profile
            </button>
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar
