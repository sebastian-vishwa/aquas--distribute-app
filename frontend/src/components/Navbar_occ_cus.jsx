import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar_occ_cus.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h2 className="logo-text">💧 AquaPure</h2>
      </div>
      <div className="nav-links">
        {/* NavLink automatically adds class="active" when clicked */}
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className="nav-icons">
        <span style={{cursor: 'pointer'}} onClick={() => alert('Cart clicked!')}>🛒</span>
        <span style={{cursor: 'pointer'}} onClick={() => alert('Profile clicked!')}>👤</span>
      </div>
    </nav>
  );
}