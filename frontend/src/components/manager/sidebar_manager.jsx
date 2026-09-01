import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Droplet, 
  UserCheck, 
  LayoutDashboard, 
  Package,
  ShoppingCart, 
  Truck, 
  Users, 
  BarChart3, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import './sidebar_manager.css';

export default function SidebarManager() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Session / token clear karanna one nam methanata danna puluwan (e.g., localStorage.clear())
    navigate('/');
  };

  return (
    <aside 
      className={`manager-sidebar ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="sidebar-header">
        <h2 className="brand-logo" style={{display: 'flex',alignItems: 'left-align',justifyContent: 'left-align',gap: '8px',width: '100%',fontSize: '34px',color:'#5ED7FF'}}>
          <svg
  width="30"
  height="38"
  viewBox="0 0 40 48"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="aquasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#5ED7FF" />
      <stop offset="50%" stopColor="#65BFFF" />
      <stop offset="100%" stopColor="#A77BFF" />
    </linearGradient>
  </defs>

  <path
    d="M20 2C20 2 5 19 5 29C5 38 11.7 46 20 46C28.3 46 35 38 35 29C35 19 20 2 20 2Z"
    fill="url(#aquasGradient)"
  />
</svg>
          {isExpanded ? 'Aquas' : ''}
        </h2>
        
        <div className="admin-profile">
          <div className="avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={20} color="#0A3D91" />
          </div>
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
          <span className="icon">
            <LayoutDashboard size={20} />
          </span>
          {isExpanded && <span className="label">Overview</span>}
        </NavLink>

        <NavLink to="/manager/inventory" className="nav-item">
          <span className="icon">
            <Package size={20} />
          </span>
          {isExpanded && <span className="label">Inventory</span>}
        </NavLink>
        
        <NavLink to="/manager/orders" className="nav-item">
          <span className="icon">
            <ShoppingCart size={20} />
          </span>
          {isExpanded && <span className="label">Orders</span>}
        </NavLink>

        <NavLink to="/manager/fleet" className="nav-item">
          <span className="icon">
            <Truck size={20} />
          </span>
          {isExpanded && <span className="label">Fleet Management</span>}
        </NavLink>

        <NavLink to="/manager/customers" className="nav-item">
          <span className="icon">
            <Users size={20} />
          </span>
          {isExpanded && <span className="label">Customers</span>}
        </NavLink>

        <NavLink to="/manager/reports" className="nav-item">
          <span className="icon">
            <BarChart3 size={20} />
          </span>
          {isExpanded && <span className="label">Reports</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item footer-btn" onClick={() => alert('Support Opened')}>
          <span className="icon">
            <HelpCircle size={20} />
          </span>
          {isExpanded && <span className="label">Support</span>}
        </button>
        <button className="nav-item footer-btn" onClick={handleSignOut}>
          <span className="icon">
            <LogOut size={20} />
          </span>
          {isExpanded && <span className="label">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}