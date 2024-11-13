// src/Layout/DashboardItem.tsx
import React from 'react';

interface DashboardItemProps {
  path: string;
  icon: string;
  title: string;
  bgColor: string;
  iconSize?: string; // Optional prop for icon size
}

const DashboardItem: React.FC<DashboardItemProps> = ({ path, icon, title, bgColor, iconSize = '80px' }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        width: '450px',
        height: '350px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      }}
      className="dashboard-item" // Apply the dashboard-item class
    >
      {/* Shimmer effect */}
      <div className="shimmer" />
      
      <img
        src={icon}
        alt={title}
        style={{
          width: iconSize,
          height: iconSize,
          zIndex: 1, // Keep icon above the shimmer
        }}
      />
      
      <p
        style={{
          margin: '10px 0 0',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#ffffff',
          textAlign: 'center',
          zIndex: 1, // Keep text above the shimmer
        }}
      >
        {title}
      </p>
    </div>
  );
};

export default DashboardItem;
