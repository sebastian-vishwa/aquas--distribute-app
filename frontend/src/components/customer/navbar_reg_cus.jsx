import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
        <h2 className="navbar-brand" onClick={() => navigate('/portal')}>
          💧 AquaPure <span className="navbar-portal-tag">PORTAL</span>
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
      <div className="navbar-right">
        <div className="search-wrapper">
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
          >
            🔍
          </span>
        </div>

        <span className="icon-btn" title="Notifications">🔔</span>
        <span className="icon-btn" title="Cart">🛒</span>

        <div
          className="user-avatar"
          onClick={() => navigate('/login')}
          title="Sign Out"
        >
          JD
        </div>
      </div>
    </nav>
  );
}