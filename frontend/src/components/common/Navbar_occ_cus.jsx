import React,{useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import './Navbar_occ_cus.css';

export default function NavbarOccCus() {
  const navigate = useNavigate();
  const { cartItems } = useCart(); 
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Cart Wrapper eka */}
        <div 
          className="cart-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Cart Icon */}
          <span 
            className="cart-icon" 
            onClick={() => navigate('/checkout')} 
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            🛒
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </span>

          {/* Hover Popup eka */}
          {isHovered && (
            <div className="cart-popup">
              <h4>Your Cart</h4>
              {cartItems.length === 0 ? (
                <p style={{fontSize: '0.8rem', color: '#666'}}>Cart is empty</p>
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

        <span style={{ cursor: 'pointer', marginLeft: '1rem' }} onClick={() => navigate('/login')}>👤</span>
      </div>



    </nav>
  );
}