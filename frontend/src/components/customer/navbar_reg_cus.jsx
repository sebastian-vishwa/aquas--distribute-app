import React, { useState, useEffect,useRef  } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegCart } from '../../context/RegCartContext';
import { Search, Bell, ShoppingCart, X, User, Settings, History, Tag, ArrowLeft,ArrowRight, Plus, Minus,Trash2, CreditCard } from 'lucide-react';
import logoImg from '../../assets/logo.png';
import './navbar_reg_cus.css';

export default function NavbarRegCus() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const profileRef = useRef(null);

  // Dynamic customer data
  const [customerData, setCustomerData] = useState(null);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/customers');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCustomerData(data[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch customer data:', error);
      }
    };
    fetchCustomer();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setCustomerData(null);
    navigate('/login');
  };


  // Registered customer cart data + actions from RegCartContext
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    cartCount,
    subtotal,
    cartTotal,
  } = useRegCart();

  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const getTotal = () => subtotal + deliveryFee;

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems,
          deliveryAddress: '125 Main Street, Colombo', // wire to real address later
        }),
      });
      if (res.ok) {
        await clearCart();
        setShowCheckout(false);
        navigate('/portal/orders');
      } else {
        console.error('Checkout failed:', await res.json());
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, []);

  const getNavLinkStyle = ({ isActive }) => ({
    color: isActive ? '#FFFFFF' : '#E2E8F0',
    borderBottom: isActive ? '2px solid #FFFFFF' : '2px solid transparent',
    textDecoration: 'none',
    paddingBottom: '4px',
    transition: 'color 0.2s ease, border-color 0.2s ease',
  });

  return (
    <>
    <nav className="navbar-container navbar" style={{ background: '#0A3D91', borderBottom: 'none' }}>
      {/* Left: Brand Logo */}
      <div className="navbar-left logo-container" onClick={() => navigate('/portal')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img 
          src={logoImg} 
          alt="Aquas Logo" 
          style={{ height: '45px', objectFit: 'contain', cursor: 'pointer', filter: 'brightness(0) invert(1)' }} 
        />
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-center nav-links">
        <NavLink to="/portal" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} style={getNavLinkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/portal/products" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} style={getNavLinkStyle}>
          Catalogue
        </NavLink>
        <NavLink to="/portal/orders" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} style={getNavLinkStyle}>
          Orders
        </NavLink>
        <NavLink to="/portal/deliveries" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} style={getNavLinkStyle}>
          Deliveries
        </NavLink>
      </div>

      {/* Right: Pure Icon Group */}
      <div className="navbar-right nav-icons">
        {showSearch ? (
          <div 
            className="navbar-search-wrapper" 
            style={{ 
              background: 'rgba(255, 255, 255, 0.15)', 
              border: '1px solid rgba(255, 255, 255, 0.25)', 
              borderRadius: '8px' 
            }}
          >
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search orders, items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
              style={{ color: '#FFFFFF' }}
            />
            <button
              className="icon-btn close-search-btn"
              onClick={() => { setShowSearch(false); setSearchQuery(''); }}
              title="Close Search"
              style={{ color: '#FFFFFF' }}
            >
              <X size={18} color="#FFFFFF" stroke="#FFFFFF" />
            </button>
          </div>
        ) : (
          <button
            className="icon-btn"
            title="Search"
            onClick={() => setShowSearch(true)}
            style={{ color: '#FFFFFF' }}
          >
            <Search size={20} color="#FFFFFF" stroke="#FFFFFF" />
          </button>
        )}
        <button className="icon-btn" title="Notifications" style={{ color: '#FFFFFF' }}>
          <Bell size={20} color="#FFFFFF" stroke="#FFFFFF" />
        </button>
        {/* CART */}
        <div 
          className="cart-wrapper" 
          onMouseEnter={() => setShowCart(true)} 
          onMouseLeave={() => setShowCart(false)}
        >
          <button
            className="icon-btn cart-button"
            title="Cart"
            onClick={() => navigate('/portal/checkout')}
            style={{ color: '#FFFFFF' }}
          >
            <ShoppingCart size={20} color="#FFFFFF" stroke="#FFFFFF" />
            {cartCount > 0 && <span className="cart-badge-red">{cartCount}</span>}
          </button>

          {showCart && (
            <div className="cart-preview">
              <div className="cart-preview-header">
                <h3>Your Cart</h3>
                <span>{cartCount} item{cartCount !== 1 ? 's' : ''}</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart size={35} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-preview-items">
                    {cartItems.map((item, index) => (
                      <div className="cart-preview-item" key={item.id || item._id || index}>
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name || item.title} 
                            className="cart-item-thumb" 
                          />
                        ) : (
                          <div className="cart-item-thumb-placeholder">
                            <ShoppingCart size={16} />
                          </div>
                        )}
                        <div className="cart-item-info">
                          <strong className="cart-item-title">{item.name || item.title}</strong>
                          <span className="cart-item-qty">
                            Qty: {item.quantity} × Rs. {Number(item.price || 0).toLocaleString()}
                          </span>
                        </div>
                        <strong className="cart-item-price">
                          Rs. {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString()}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="cart-preview-total">
                    <span>Subtotal</span>
                    <strong>Rs. {Number(cartTotal || subtotal || 0).toLocaleString()}</strong>
                  </div>

                  <button
                    className="checkout-preview-button"
                    onClick={() => { 
                      setShowCart(false); 
                      navigate('/portal/checkout'); 
                    }}
                  >
                    View Checkout
                    <ArrowRight size={17} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="profile-wrapper" ref={profileRef}>
          <button
            className="user-avatar-circle"
            onClick={() => setShowProfile(!showProfile)}
            title="Account"
            style={{ backgroundColor: '#FFFFFF', color: '#0A3D91', fontWeight: 700 }}
          >
            {customerData?.name ? customerData.name.charAt(0).toUpperCase() : 'U'}
          </button>

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-dropdown-header">
                <div className="profile-avatar">
                  {customerData?.name ? customerData.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div>
                  <strong>{customerData?.name || 'Guest'}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748B' }}>
                    {customerData?.email}
                  </span>
                </div>
              </div>

              <div className="profile-divider"></div>
              <button className="profile-menu-item">
                <User size={18} />
                Profile
              </button>

              <button className="profile-menu-item">
                <Settings size={18} />
                Settings
              </button>

              <button className="profile-menu-item">
                <History size={18} />
                Order History
              </button>

              <button className="profile-menu-item">
                <Tag size={18} />
                Offers
              </button>

              <div className="profile-divider"></div>

              <button
                className="profile-menu-item logout"
                onClick={handleLogout}
              >
                <ArrowLeft size={18} />
                Sign Out
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>

    {/* CHECKOUT MODAL */}
          {showCheckout && (
            <div className="checkout-overlay">
              <div className="checkout-modal">
                <div className="checkout-header">
                  <div>
                    <span className="checkout-label">AQUAS WHOLESALE</span>
                    <h2>Checkout</h2>
                    <p>Review your order before payment.</p>
                  </div>
                  <button className="checkout-close" onClick={() => setShowCheckout(false)}>
                    <X size={21} />
                  </button>
                </div>
    
                <div className="checkout-body">
                  <div className="checkout-items-section">
                    <div className="checkout-section-title">
                      <h3>Your Items</h3>
                      <span>{cartCount} items</span>
                    </div>
    
                    {cartItems.length === 0 ? (
                      <div className="checkout-empty">
                        <ShoppingCart size={40} />
                        <h3>Your cart is empty</h3>
                        <p>Add products to continue.</p>
                      </div>
                    ) : (
                      <div className="checkout-items">
                        {cartItems.map((item) => (
                          <div className="checkout-item" key={item.id}>
                            <div className="checkout-product-icon">💧</div>
                            <div className="checkout-product-info">
                              <strong>{item.name}</strong>
                              <span>Rs. {Number(item.price || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each</span>
                            </div>
    
                            <div className="quantity-control">
                              <button onClick={() => decreaseQuantity(item.id)}>
                                <Minus size={14} />
                              </button>
                              <span>{item.quantity}</span>
                              <button onClick={() => increaseQuantity(item.id)}>
                                <Plus size={14} />
                              </button>
                            </div>
    
                            <strong className="checkout-item-price">
                              Rs. {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </strong>
    
                            <button
                              className="remove-item-button"
                              title="Remove item"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
    
                  <div className="order-summary">
                    <h3>Order Summary</h3>
    
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <strong>Rs. {Number(subtotal || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
    
                    <div className="summary-row">
                      <span>Delivery</span>
                      <strong>Rs. {Number(deliveryFee || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
    
                    <div className="summary-divider"></div>
    
                    <div className="summary-total">
                      <span>Total</span>
                      <strong>Rs. {Number(getTotal() || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                    </div>
    
                    <button
                      className="proceed-payment-button"
                      disabled={cartItems.length === 0}
                      onClick={handleCheckout}
                    >
                      <CreditCard size={19} />
                      Proceed to Pay
                    </button>
    
                    <p className="secure-payment">🔒 Secure payment processing</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
  );
}