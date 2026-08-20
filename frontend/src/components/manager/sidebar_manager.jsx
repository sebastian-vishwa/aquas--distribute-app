import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar_manager.css';

export default function SidebarManager() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside 
      className={`manager-sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <h2 className="brand-logo">💧 {isExpanded ? 'AquaPure' : ''}</h2>
        
        <div className="admin-profile">
          <div className="avatar">👨‍💼</div>
          {isExpanded && (
            <div className="profile-info">
              <h4>Admin Console</h4>
              <span>Wholesale Manager</span>
            </div>
          )}
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/manager" end className="nav-item">
          <span className="icon">🎛️</span>
          {isExpanded && <span className="label">Overview</span>}
        </NavLink>
        <NavLink to="/manager/inventory" className="nav-item">
          <span className="icon">📦</span>
          {isExpanded && <span className="label">Inventory</span>}
        </NavLink>
        <NavLink to="/manager/fleet" className="nav-item">
          <span className="icon">🚚</span>
          {isExpanded && <span className="label">Fleet Management</span>}
        </NavLink>
        <NavLink to="/manager/customers" className="nav-item">
          <span className="icon">👥</span>
          {isExpanded && <span className="label">Customers</span>}
        </NavLink>
        <NavLink to="/manager/reports" className="nav-item">
          <span className="icon">📊</span>
          {isExpanded && <span className="label">Reports</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item footer-btn" onClick={() => alert('Support Opened')}>
          <span className="icon">❓</span>
          {isExpanded && <span className="label">Support</span>}
        </button>
        <button className="nav-item footer-btn" onClick={() => alert('Signing Out...')}>
          <span className="icon">🚪</span>
          {isExpanded && <span className="label">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}