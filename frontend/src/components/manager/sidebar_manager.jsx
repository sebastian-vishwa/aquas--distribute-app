import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  LayoutDashboard, 
  Package,
  ShoppingCart, 
  Truck, 
  Users, 
  BarChart3, 
  HelpCircle, 
  LogOut,
  Tag
} from 'lucide-react';
import logoImg from '../../assets/logo.png';
import iconLogo from '../../assets/Code_Generated_Image_2.png';
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
        <h2 
          className="brand-logo" 
          onClick={() => navigate('/manager')}
          style={{ 
            display: 'flex', 
            justifyContent: isExpanded ? 'flex-start' : 'center',
            alignItems: 'center', 
            cursor: 'pointer', 
            overflow: 'hidden',
            height: '50px',
            margin: '0 0 1.5rem 0',
            transition: 'all 0.3s ease'
          }}
        >
          {isExpanded ? (
            <img 
              src={logoImg} 
              alt="Aquas Logo" 
              style={{ 
                height: '45px', 
                maxWidth: '160px', 
                objectFit: 'contain', 
                objectPosition: 'left center',
                filter: 'brightness(0) invert(1)',
                display: 'block'
              }} 
            />
          ) : (
            <img 
              src={iconLogo} 
              alt="A Logo" 
              style={{ height: '28px', width: '28px', objectFit: 'contain' }} 
            />
          )}
        </h2>
        
        <div className="admin-profile">
          <div className="avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={20} color="#0A3D91" />
          </div>
          {isExpanded && (
            <div className="profile-info">
              <h4>Manager Portal</h4>
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

        <NavLink to="/manager/promotions" className="nav-item">
          <span className="icon">
            <Tag size={20} />
          </span>
          {isExpanded && <span className="label">Promotions</span>}
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