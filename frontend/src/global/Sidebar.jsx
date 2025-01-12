import React from 'react';
import { FaHome, FaSignOutAlt, FaBookMedical } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUserGroup } from 'react-icons/fa6';

function Sidebar({ isOpen }) {
  const { user, logout } = useUser();

  const handleLogOut = async () => {
    try{
      await axios.get('/auth/logout');
      logout();
    } catch {
      toast.error('Log out failed')
    }
  };

  return (
    <aside className={`fixed ml-8 mt-8 lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
      <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
        <a href="/dashboard" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaHome className="mr-2" />
          Home
        </a>

        {/* -------------------------------manager---------------------------- */}
        {user.role === "manager" && <a href="/manage-patient" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaBookMedical  className="mr-2" />
          Manage Patients
        </a>}
        {user.role === "manager" && <a href="/manage-pantry" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Manage Pantry Staff
        </a>}
        {user.role === "manager" && <a href="/track-orders" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Track Meal Orders
        </a>}
        {/* -------------------------------pantry---------------------------- */}
        {user.role === "pantry" && <a href="/manage-personnel" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Manage Personnel
        </a>}
        {user.role === "pantry" && <a href="/manage-orders" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Manage/Track Orders
        </a>}
        {user.role === "pantry" && <a href="/manage-boxes" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Manage/Track Meal Boxes
        </a>}
        {/* ---------------------------delivery---------------------------- */}
        {user.role === "delivery" && <a href="/boxes" className="flex items-center text-gray-600 hover:text-indigo-800 py-4">
          <FaUserGroup  className="mr-2" />
          Meal Boxes
        </a>}
        <a href="#" className="flex items-center text-gray-600 hover:text-indigo-800 py-4" onClick={handleLogOut}>
          <FaSignOutAlt className="mr-2" />
          Log out
        </a>
      </div>
    </aside>
  );
}

export default Sidebar;
