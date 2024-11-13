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
        backgroundColor: '#F8F9FA',
      }}
    >
      {/* Purple Header */}
      <header
        style={{
          width: '100%',
          backgroundColor: '#4B004B', // Purple background
          color: '#ffffff', // White text color
          padding: '20px 0',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <h1 style={{ margin: 0 }}>PEA System</h1>
      </header>

      {/* Dashboard Content */}
      <div
        style={{
          padding: '200px',
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
            path="/equipment-borrow"
            icon="https://img2.pic.in.th/pic/borrowicon.md.png"
            title="ข้อมูลการยืมอุปกรณ์"
            bgColor="#00bcd4"
            iconSize="250px"
          />
          <DashboardItem
            path="/borrowitem"
            icon="https://img2.pic.in.th/pic/iconstock.png"
            title="ข้อมูลอุปกรณ์สำรอง"
            bgColor="#ff4081"
            iconSize="250px"
          />
          <DashboardItem
            path="/equipment-repair"
            icon="https://img2.pic.in.th/pic/pngtree-comicstyle-wrench-and-screwdriver-icon-on-white-background-vector-png-image_41876974-Photoroom.png"
            title="ข้อมูลอุปกรณ์ส่งซ่อม"
            bgColor="#ffab91"
            iconSize="250px"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
