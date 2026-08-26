import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
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
        <h2 className="navbar-brand" onClick={() => navigate('/portal')}>💧 AQUAS </h2>
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

     {/* Right: Pure Icon Group */}
      <div className="navbar-right">
        <button className="icon-btn" title="Search">
          <Search size={20} />
        </button>
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
        </button>
        <button className="icon-btn" title="Cart">
          <ShoppingCart size={20} />
        </button>
        <div  className="user-avatar-circle" onClick={() => navigate('/login')}  title="Account / Sign Out">
          JD
        </div>
      </div>
    </nav>
  );
}