// src/components/Layout.tsx

import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleUser, faRightFromBracket, faTable } from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}


const User_Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar d-flex flex-column p-4">
        <div className="logo">
          <img src="src/assets/logo/PEA Logo on Violet.png" alt="PEA Logo" className="logo-img" />
          <hr />
        </div>
        <ul className="nav nav-pills flex-column">
          <li className='nav-item'>
            <Link to="/user-dashboard" className={`nav-link ${location.pathname === '/user-dashboard' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faTable} style={{ color: '#fefcff', paddingRight: 10 }} />ข้อมูลอุปกรณ์</Link>
          </li>
          <li className='nav-item'>
            <Link to="/approval-status" className={`nav-link ${location.pathname === '/approval-status' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#fefcff', paddingRight: 10 }} />สถานะคำขอยืม</Link>
          </li>
        </ul>
        <div className='footer user'>
          <hr />
          <div className='dropdown open'>
            <button
              className='btn border-none dropdown-toggle text-white'
              type="button"
              id="triggerID"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{padding: '10px 50px'}}
            >
             <FontAwesomeIcon icon={faCircleUser} style={{ color: '#fefcff', paddingRight: 5, fontSize: 25 }} /><span className='ms-1'>User</span>
            </button>
            <div className='dropdown-menu' aria-labelledby='triggerID'>
              <Link to="/login" className='dropdown-item'>
                <FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#fefcff', paddingRight: 10 }} />
                ออกจากระบบ
              </Link>
            </div>
          </div>
        </div>
        
      </aside>

      {/* Main Content */}
      <div className="content">
        {/* Navbar */}
        <nav className="navbar navbar-m-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 " style={{color: "#fefcff" , fontSize: "20px", marginLeft: "20px"}}>
              <b>ระบบการยืมอุปกรณ์</b>
            </span>
          </div>
        </nav>

        <main className="content-main mt-2">{children}</main>
      </div>
    </div>

    
  );
};

export default User_Layout;
