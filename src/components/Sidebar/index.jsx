import React from 'react';
import './sidebar.css';
import {
  LineStyle,
  // Timeline,
  // TrendingUp,
  PermIdentity,
  // Storefront,
  // AttachMoney,
  // BarChart,
  // MailOutline,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <ul className='sidebarList'>
            <Link to='/' className='link'>
              <li className='sidebarListItem'>
                <LineStyle className='sidebarIcon' />
                Dashboard
              </li>
            </Link>
            <Link to='/evakuasi' className='link'>
              <li className='sidebarListItem'>
                <PermIdentity className='sidebarIcon' />
                Maps Evakuasi
              </li>
            </Link>
            <Link to='#' className='link'>
              <li className='sidebarListItem'>
                <PermIdentity className='sidebarIcon' />
                Kelola Informasi
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
