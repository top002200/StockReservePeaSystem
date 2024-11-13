import React from "react";
import DashboardItem from "../Layout/DashboardItem";
import Layout from "../Layout/Layout";

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "row", // Align items in a row
          justifyContent: "center", // Center the items horizontally
          alignItems: "center", // Center the items vertically
          gap: "30px",
          flexWrap: "nowrap", // Ensure items stay in one row
          minHeight: "100vh", // Full viewport height
          width: "100%", // Full viewport width
          overflowX: "auto", // Allow horizontal scroll if necessary
        }}
      >
        <DashboardItem
          path="/equipment-borrow"
          icon="/path-to-icon/computer-icon.png"
          title="ข้อมูลการยืมอุปกรณ์"
          bgColor="#00bcd4"
        />
        <DashboardItem
          path="/spare-equipment"
          icon="https://img2.pic.in.th/pic/iconstock.png"
          title="ข้อมูลอุปกรณ์สำรอง"
          bgColor="#ff4081"
          iconSize="250px" // Set the icon size to 80px or whatever size you prefer
        />
        <DashboardItem
          path="/equipment-repair"
          icon="/path-to-icon/tools-icon.png"
          title="ข้อมูลอุปกรณ์ส่งซ่อม"
          bgColor="#ffab91"
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
