import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Droplet, Search, Bell, ShoppingCart, X } from 'lucide-react';
import './navbar_reg_cus.css';

export default function NavbarRegCus() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <nav className="navbar-container">
      {/* Left: Brand Logo */}
      <div className="navbar-left">
        <h2 
          className="navbar-brand" 
          onClick={() => navigate('/portal')}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
        >
          <Droplet size={22} fill="#0A3D91" color="#0A3D91" /> Aquas
        </h2>
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-center">
        <NavLink to="/portal" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Dashboard
        </NavLink>
        <NavLink to="/portal/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Shop Catalogue
        </NavLink>
        <NavLink to="/portal/orders" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          My Orders
        </NavLink>
        <NavLink to="/portal/deliveries" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Deliveries
        </NavLink>
      </div>

      {/* Right: Search Icon & User Actions */}
      <div className="navbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="search-wrapper" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {showSearch && (
            <input
              type="text"
              className="search-input"
              placeholder="Search TRK ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
          )}
          <span
            className="icon-btn"
            title="Search"
            onClick={() => setShowSearch(!showSearch)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            {showSearch ? <X size={20} color="#64748B" /> : <Search size={20} color="#1E293B" />}
          </span>
        </div>

        <span 
          className="icon-btn" 
          title="Notifications"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <Bell size={20} color="#1E293B" />
        </span>

        <span 
          className="icon-btn" 
          title="Cart"
          onClick={() => navigate('/portal/products')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <ShoppingCart size={20} color="#1E293B" />
        </span>

        <div
          className="user-avatar"
          onClick={() => navigate('/login')}
          title="Sign Out"
          style={{ cursor: 'pointer' }}
        >
          JD
        </div>
      </div>
    </nav>
  );
}