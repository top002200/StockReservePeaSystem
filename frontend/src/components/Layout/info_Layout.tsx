// src/components/Layout.tsx

import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket, faTable, faUserGear } from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}


const Info_Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar d-flex flex-column p-4">
        <div className="logo">
          <a href='/Dashboard'><img src="src/assets/logo/PEA Logo on Violet.png" alt="PEA Logo" className="logo-img" /></a>
          <hr />
        </div>
        <ul className="nav nav-pills flex-column">
          <li className='nav-item'>
            <Link to="/equipment-info" className={`nav-link ${location.pathname === '/equipment-info' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faTable} style={{ color: '#fefcff', paddingRight: 10 }} />ข้อมูลอุปกรณ์สำรอง</Link>
          </li>
        </ul>
        <div className='footer equip'>
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
              <Link to="/personal-info" className='dropdown-item'>
                <FontAwesomeIcon icon={faUserGear} style={{ color: '#fefcff', paddingRight: 10 }} />
                ข้อมูลส่วนตัว
              </Link>
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
        <main className="content-main">
          {children}
        </main>
      </div>
    </div>

    
  );
};

export default Info_Layout;
