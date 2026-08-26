import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { Droplet, ShoppingCart, User } from 'lucide-react';
import './Navbar_occ_cus.css';

export default function NavbarOccCus() {
  const navigate = useNavigate();
  const { cartItems } = useCart(); 
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <h2 className="logo-text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplet size={24} fill="#0A3D91" color="#0A3D91" /> Aquas
        </h2>
      </div>
      
      {/* Navigation Links */}
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      
      {/* Icons Area */}
      <div className="nav-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {/* Cart Wrapper */}
        <div 
          className="cart-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cart Icon */}
          <span 
            className="cart-icon" 
            onClick={() => navigate('/checkout')} 
            style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
          >
            <ShoppingCart size={22} color="#1E293B" />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </span>

          {/* Hover Popup */}
          {isHovered && (
            <div className="cart-popup">
              <h4>Your Cart</h4>
              {cartItems.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: '#666' }}>Cart is empty</p>
              ) : (
                <div className="popup-items">
                  {cartItems.map((item, index) => (
                    <div key={index} className="popup-item">
                      <span className="item-name">{item.title} (x{item.quantity})</span>
                      <span className="item-price">Rs.{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              )}
              <button className="popup-checkout-btn" onClick={() => navigate('/checkout')}>
                View Checkout
              </button>
            </div>
          )}
        </div>

        {/* User Login Profile Icon */}
        <span 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} 
          onClick={() => navigate('/login')}
          title="Account Login"
        >
          <User size={22} color="#1E293B" />
        </span>
      </div>
    </nav>
  );
}