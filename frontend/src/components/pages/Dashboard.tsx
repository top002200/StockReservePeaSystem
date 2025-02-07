// src/pages/Dashboard.tsx
import React from 'react';
import DashboardItem from '../Layout/DashboardItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#fefcff',
      }}
    >
      {/* Purple Header */}
     {/* Header with menu */}
     <header
        style={{
          width: '100%',
          backgroundImage: 'linear-gradient(to bottom, #74045f 40%, #c7911b 100%)',
          padding: '20px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <img
            src="src/assets/logo/PEA Logo on Violet.png"
            alt="PEA Logo"
            style={{ width: '180px', textAlign: 'left' }}
          />

          {/* Menu */}
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/login"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/login" ? "active-link" : ""}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#fefcff', paddingRight: 5 }} />ออกจากระบบ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Dashboard Content */}
      <div
        style={{
          padding: '100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <DashboardItem
            path="/borrowitem"
            icon="https://img2.pic.in.th/pic/borrowicon.md.png"
            title="ข้อมูลการยืมอุปกรณ์"
            bgColor="#F2909D"
            iconSize="150px"
          />
          <DashboardItem
            path="/equipment-info"
            icon="https://img2.pic.in.th/pic/iconstock.png"
            title="ข้อมูลอุปกรณ์สำรอง"
            bgColor="#A2C0E6"
            iconSize="150px"
          />
          <DashboardItem
            path="/equipment-repair"
            icon="https://img2.pic.in.th/pic/pngtree-comicstyle-wrench-and-screwdriver-icon-on-white-background-vector-png-image_41876974-Photoroom.png"
            title="ข้อมูลอุปกรณ์ส่งซ่อม"
            bgColor="#FFA780"
            iconSize="150px"
          />
          {/*
          <DashboardItem
            path="/personal-info"
            icon="https://img2.pic.in.th/pic/setting58c7ca34f4b6809d.md.png"
            title="จัดการข้อมูลผู้ใช้"
            bgColor="#90C66E"
            iconSize="150px"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
