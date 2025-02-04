// src/components/Layout.tsx

import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faRightFromBracket, faTable, faUser, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS

interface LayoutProps {
  children: React.ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => {

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
            <Link to="/borrowitem" className={`nav-link ${location.pathname === '/borrowitem' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faTable} style={{ color: '#fefcff', paddingRight: 10 }} />ข้อมูลอุปกรณ์</Link>
          </li>
          <li className='nav-item'>
            <Link to="/approval" className={`nav-link ${location.pathname === '/approval' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faCircleCheck} style={{ color: '#fefcff', paddingRight: 10 }} />คำขอยืมอุปกรณ์</Link>
          </li>
          {/*<li className='nav-item'>
            <Link to="/user-management" className={`nav-link ${location.pathname === '/user-management' ? 'active' : ''}`}>
              <FontAwesomeIcon icon={faUser} style={{ color: '#fefcff', paddingRight: 10 }} />จัดการข้อมูลผู้ใช้งาน</Link>
          </li>*/}
        </ul>
        
        <div className='footer'>
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
        {/* Navbar */}
        <nav className="navbar navbar-m-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 " style={{color: "#fefcff" , fontSize: "20px", marginLeft: "20px"}}>
              <b>ระบบข้อมูลการยืมอุปกรณ์</b>
            </span>
          </div>
        </nav>

        <main className="content-main mt-2">{children}</main>
      </div>
    </div>


  );
};

export default Layout;
