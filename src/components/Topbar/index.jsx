import React from 'react';
import './topbar.css';
import { Settings } from '@mui/icons-material';

export default function Topbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topLeft'>
          <span className='logo'>GIS Admin Panel</span>
        </div>
        <div className='topRight'>
          <div className='topbarIconContainer'>
            <button className='white_btn'>Logout</button>
          </div>
          <div className='topbarIconContainer'>
            <button className='blue_btn' onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
