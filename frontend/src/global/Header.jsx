import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUser } from 'react-icons/fa';

function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useUser();

  const togglePopup = () => setShowPopup(!showPopup);


  const handleLogOut = async () => {
    try {
      await axios.get('/auth/logout');
      logout();
    } catch {
      toast.error('Log out failed')
    }
  };

  return (
    <header className="fixed w-full bg-white text-indigo-800 z-50 shadow-lg">
      <div className="mx-auto px-4 py-2 flex items-center justify-between h-16">
        <div className="text-2xl ml-4 font-bold text-blue-400 flex items-center space-x-2">
          <span>Heli<span className="text-indigo-800">verse</span></span>
        </div>

        <div className="relative flex items-center">

          <FaUser className='w-10 h-10 rounded-full object-cover p-2 bg-gray-600 text-white cursor-pointer' onClick={togglePopup} />
          {showPopup && (
            <div className="absolute top-10 right-0 mt-2 bg-gray-100 shadow-lg rounded-lg w-40 p-1">
              <button
                onClick={handleLogOut}
                className="w-full text-indigo-800 hover:bg-indigo-100 text-left py-2 px-3 rounded-lg"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
