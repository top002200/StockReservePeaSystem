// src/components/Layout.tsx

import React from 'react';
import './Layout.css';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="path-to-your-logo.png" alt="PEA Logo" className="logo-img" />
          <h2>PEA System</h2>
        </div>
        <nav className="nav flex-column">
          <Link to="/equipment-data" className="nav-link">ข้อมูลอุปกรณ์</Link>
          <Link to="/borrow-equipment" className="nav-link">คำขอยืมอุปกรณ์</Link>
          <Link to="/user-management" className="nav-link">จัดการข้อมูลผู้ใช้งาน</Link>
          <Link to="/personal-info" className="nav-link">ข้อมูลส่วนตัว</Link>
          <Link to="/logout" className="nav-link">ออกจากระบบ</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="content">
        <header className="content-header">
          <h1>PEA System</h1>
        </header>
        <main className="content-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
