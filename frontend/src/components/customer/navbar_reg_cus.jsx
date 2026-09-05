import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../components/common/CartContext';
import { Search, Bell, ShoppingCart, X, User, Settings, History, Tag, ArrowLeft,ArrowRight, Plus, Minus,Trash2, CreditCard } from 'lucide-react';
import './navbar_reg_cus.css';

export default function NavbarRegCus() {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Logged-in user data
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) { setUserLoading(false); return; }
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) setUser(await res.json());
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  };
  const displayName = user?.companyName || user?.name || (userLoading ? 'Loading...' : 'Guest');
  const displayEmail = user?.email || '';
  const initials = userLoading ? '…' : getInitials(user?.companyName || user?.name);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    navigate('/login');
  };


  // Cart data + actions — from context, not owned here
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    cartCount,
    subtotal,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 15 : 0;
  const getTotal = () => subtotal + deliveryFee;

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  return (
    <>
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
          Catalogue
        </NavLink>
        <NavLink to="/portal/orders" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Orders
        </NavLink>
        <NavLink to="/portal/deliveries" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Deliveries
        </NavLink>
      </div>

      {/* Right: Pure Icon Group */}
      <div className="navbar-right">
        {showSearch ? (
          <div className="navbar-search-wrapper">
            <input
              type="text"
              className="navbar-search-input"
              placeholder="Search orders, items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
            <button
              className="icon-btn close-search-btn"
              onClick={() => { setShowSearch(false); setSearchQuery(''); }}
              title="Close Search"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            className="icon-btn"
            title="Search"
            onClick={() => setShowSearch(true)}
          >
            <Search size={20} />
          </button>
        )}
        <button className="icon-btn" title="Notifications">
          <Bell size={20} />
        </button>
        {/* CART */}
        <div className="cart-wrapper" onMouseEnter={() => setShowCart(true)} onMouseLeave={() => setShowCart(false)}>
          <button
            className="icon-btn cart-button"
            title="Cart"
            onClick={() => setShowCart((prev) => !prev)}
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {showCart && (
            <div className="cart-preview">
              <div className="cart-preview-header">
                <h3>Your Cart</h3>
                <span>{cartCount} items</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingCart size={35} />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="cart-preview-items">
                    {cartItems.map((item) => (
                      <div className="cart-preview-item" key={item.id}>
                        <div className="cart-item-info">
                          <strong>{item.name}</strong>
                          <span>Qty: {item.quantity}</span>
                        </div>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    ))}
                  </div>

                  <div className="cart-preview-total">
                    <span>Subtotal</span>
                    <strong>${subtotal.toFixed(2)}</strong>
                  </div>

                  <button
                    className="checkout-preview-button"
                    onClick={() => { setShowCheckout(true); setShowCart(false); }}
                  >
                    View Cart & Checkout
                    <ArrowRight size={17} />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="profile-wrapper">
          <button
            className="user-avatar-circle"
            onClick={() => setShowProfile(!showProfile)}
            title="Account"
          >
            JD
          </button>

          {showProfile && (
            <div className="profile-dropdown">

              <div className="profile-dropdown-header">
                <div className="profile-avatar">JD</div>

                <div>
                  <strong>John Doe</strong>
                  <span>john@example.com</span>
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
                onClick={() => navigate('/login')}
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
                              <span>${item.price.toFixed(2)} each</span>
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
                              ${(item.price * item.quantity).toFixed(2)}
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
                      <strong>${subtotal.toFixed(2)}</strong>
                    </div>
    
                    <div className="summary-row">
                      <span>Delivery</span>
                      <strong>${deliveryFee.toFixed(2)}</strong>
                    </div>
    
                    <div className="summary-divider"></div>
    
                    <div className="summary-total">
                      <span>Total</span>
                      <strong>${getTotal().toFixed(2)}</strong>
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