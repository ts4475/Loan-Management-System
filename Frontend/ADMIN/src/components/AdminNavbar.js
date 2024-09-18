import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHome, faUser, faLifeRing, faBars } from '@fortawesome/free-solid-svg-icons';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center bg-[#5F7A61] p-4 text-white">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBars} className="text-2xl mr-2 cursor-pointer" />
        <span className="font-bold text-lg">Capital Nest</span>
      </div>
      <div className="flex items-center space-x-6">
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/dashboard')}
        >
          <FontAwesomeIcon icon={faHome} className="text-2xl" />
          <span className="text-sm">Home</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/support')}
        >
          <FontAwesomeIcon icon={faLifeRing} className="text-2xl" />
          <span className="text-sm">Support</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={() => navigate('/myaccount')}
        >
          <FontAwesomeIcon icon={faUser} className="text-2xl" />
          <span className="text-sm">Profile</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer hover:text-gray-300"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
          <span className="text-sm">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
