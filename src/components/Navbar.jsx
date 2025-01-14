
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Tooltip } from 'react-tippy';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login')
  };

  return (
    <nav className="bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-white text-2xl md:text-3xl font-bold" aria-label="Go to Home">
              Employee
            </Link>
          </div>
          <Tooltip title="Logout" position="bottom" trigger="mouseenter" >
          <button onClick={handleLogout} className="bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition">
            Logout
          </button>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
