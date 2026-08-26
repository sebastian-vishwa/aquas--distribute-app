import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar_occ_cus.css';

export default function NavbarOccCus() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <h2 className="logo-text">💧 AquaPure</h2>
      </div>
      
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      
      <div className="nav-icons">
        <span style={{ cursor: 'pointer' }} onClick={() => alert('Cart clicked!')}>🛒</span>
        {/* Profile Icon routes to Login */}
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>👤</span>
      </div>
    </nav>
  );
}