// src/components/Layout.tsx

import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTable, faUserGear } from '@fortawesome/free-solid-svg-icons';

interface LayoutProps {
  children: React.ReactNode;
}


const Repair_Layout: React.FC<LayoutProps> = ({ children }) => {

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
            <Link to="/equipment-repair" className={`nav-link ${location.pathname === '/equipment-repair' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faTable} style={{ color: '#fefcff', paddingRight: 6 }} />ข้อมูลอุปกรณ์ส่งซ่อม</Link>
          </li>
        </ul>
        <div className='footer equip'>
          <ul className='nav nav-pills flex-column'>
            {/*<li className='nav-item'>
              <Link to="/personal-info" className={`nav-link ${location.pathname === '/personal-info' ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faUserGear} style={{ color: '#fefcff', paddingRight: 10 }} />ข้อมูลส่วนตัว</Link>
            </li> */}
            <li className='nav-item'>
              <Link to="/logout" className={`nav-link ${location.pathname === '/logout' ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#fefcff', paddingRight: 10 }} />ออกจากระบบ</Link>
            </li>
          </ul>
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

export default Repair_Layout;
