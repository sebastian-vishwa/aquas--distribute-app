import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { ShoppingCart, User } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './Navbar_occ_cus.css';

export default function NavbarOccCus() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartCount } = useCart(); 
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="Aquas Logo" 
          style={{ height: '45px', objectFit: 'contain', cursor: 'pointer' }} 
        />
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
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </span>

          {/* Hover Popup */}
          {isHovered && (
            <div className="cart-popup">
              <h4>Your Cart</h4>
              {cartItems.length === 0 ? (
                <p style={{ fontSize: '0.85rem', color: '#64748b', padding: '0.5rem 0', margin: 0 }}>Cart is empty</p>
              ) : (
                <>
                  <div className="popup-items">
                    {cartItems.map((item, index) => (
                      <div key={item.id || index} className="popup-item">
                        <span className="item-name">{item.name || item.title} (x{item.quantity})</span>
                        <span className="item-price">Rs. {((item.price || 0) * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="popup-subtotal" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #e2e8f0', marginBottom: '10px', fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                    <span>Subtotal:</span>
                    <span>Rs. {cartTotal.toLocaleString()}</span>
                  </div>
                </>
              )}
              <button className="popup-checkout-btn" onClick={() => { setIsHovered(false); navigate('/checkout'); }}>
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