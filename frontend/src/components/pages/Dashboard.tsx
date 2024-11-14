// src/pages/Dashboard.tsx
import React from 'react';
import DashboardItem from '../Layout/DashboardItem';


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
      <header
        style={{
          width: '100%',
          backgroundColor: '#74045f', // Purple background
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <img src="src/assets/logo/PEA Logo on Violet.png" alt="PEA Logo" className="logo-img" />
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
            bgColor="#a0d8e4"
            iconSize="200px"
          />
          <DashboardItem
            path="/equipment-info"
            icon="https://img2.pic.in.th/pic/iconstock.png"
            title="ข้อมูลอุปกรณ์สำรอง"
            bgColor="#bb96f7"
            iconSize="200px"
          />
          <DashboardItem
            path="/equipment-repair"
            icon="https://img2.pic.in.th/pic/pngtree-comicstyle-wrench-and-screwdriver-icon-on-white-background-vector-png-image_41876974-Photoroom.png"
            title="ข้อมูลอุปกรณ์ส่งซ่อม"
            bgColor="#ffc684"
            iconSize="200px"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
