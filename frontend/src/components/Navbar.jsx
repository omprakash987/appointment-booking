import { useNavigate } from 'react-router-dom';
import { userStore } from '../store/userStore';

export default function Navbar() {
  const user = userStore(state => state.user);
  const logout = userStore(state => state.logout);
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-white font-bold text-xl">
              College Appointment System
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-white mr-4">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}