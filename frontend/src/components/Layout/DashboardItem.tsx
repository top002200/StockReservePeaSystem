// src/Layout/DashboardItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DashboardItemProps {
  path: string;
  icon: string;
  title: string;
  bgColor: string;
  iconSize?: string; // Optional prop for icon size
}

const DashboardItem: React.FC<DashboardItemProps> = ({ path, icon, title, bgColor, iconSize = '80px' }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)} // Navigate to the path when clicked
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
        boxShadow: '0 15px 16px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer', // Show pointer to indicate clickability
      }}
      className="dashboard-item"
    >
      {/* Shimmer effect */}
      <div
        className="shimmer"
        style={{
          display: 'none', // Initially hidden
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none', // Ensure shimmer doesn't block mouse events
          zIndex: 0,
        }}
      />

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
