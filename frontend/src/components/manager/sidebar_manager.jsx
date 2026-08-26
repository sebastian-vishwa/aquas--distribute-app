import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Droplet, 
  UserCheck, 
  LayoutDashboard, 
  Package, 
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
        <h2 className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplet size={24} fill="#0A3D91" color="#0A3D91" /> 
          {isExpanded ? 'AquaPure' : ''}
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