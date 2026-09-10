import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/common/CartContext';
import { CreditCard, User, Lock, Trash2, ArrowLeft, Plus, Minus, CheckCircle2 } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, cartTotal, cartCount } = useCart();
  const navigate = useNavigate();

  // Modal Control States
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);

  // Form Details State
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    location: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    console.log('Guest Order Details:', { customer: formData, items: cartItems, total: cartTotal });
    alert('Order details submitted successfully! (Connecting to payment gateway...)');
    setShowGuestForm(false);
    
    // Alert eka OK kalama Under Development page ekata yanna
    navigate('/payment');
  };

  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-title">Checkout</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart-card">
          <p className="empty-cart-msg">Your cart is empty. Go back to products and add some items!</p>
          <button 
            type="button" 
            onClick={() => navigate(window.location.pathname.startsWith('/portal') ? '/portal/products' : '/products')} 
            className="btn-browse-products"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1.2rem' }}
          >
            <ArrowLeft size={16} /> Return to Products
          </button>
        </div>
      ) : (
        <div className="checkout-grid">
          
          {/* Cart Items Table */}
          <div className="checkout-items-list">
            <div className="table-responsive">
              <table className="checkout-cart-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Item Name</th>
                    <th style={{ textAlign: 'center' }}>Quantity</th>
                    <th style={{ textAlign: 'right' }}>Unit Price</th>
                    <th style={{ textAlign: 'right' }}>Total Price</th>
                    <th style={{ textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id || item._id}>
                      <td className="table-item-name">
                        <span className="item-title-text">{item.name || item.title}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div className="table-qty-controls">
                          <button 
                            type="button"
                            onClick={() => decreaseQuantity(item.id)} 
                            className="btn-qty-mini"
                            title="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => increaseQuantity(item.id)} 
                            className="btn-qty-mini"
                            title="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        Rs. {Number(item.price || 0).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 600, color: '#0A3D91' }}>
                        Rs. {(Number(item.price || 0) * Number(item.quantity || 1)).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          type="button"
                          onClick={() => removeFromCart(item.id)} 
                          className="btn-remove-item"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="table-footer-row">
                    <td colSpan="3" style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.05rem', paddingTop: '1.2rem' }}>
                      Grand Total:
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800, fontSize: '1.2rem', color: '#0A3D91', paddingTop: '1.2rem' }}>
                      Rs. {cartTotal.toLocaleString()}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="checkout-summary-box">
            <h2>Order Summary</h2>
            <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#64748b' }}>
              <span>Total Items:</span>
              <span>{cartCount}</span>
            </div>
            <div className="summary-total-row">
              <span>Grand Total:</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <button 
              type="button"
              onClick={() => setShowChoiceModal(true)}
              className="btn-proceed-pay"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <CreditCard size={18} /> Proceed to Pay
            </button>
          </div>

        </div>
      )}

      {/* 1. CHOICE MODAL (Guest vs Regular Customer) */}
      {showChoiceModal && (
        <div className="checkout-modal-overlay" onClick={() => setShowChoiceModal(false)}>
          <div className="checkout-modal-box" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header-title">Choose Account Type</h2>
            <p className="modal-header-subtitle">How would you like to proceed with your order?</p>
            
            <div className="modal-choice-buttons">
              <button 
                type="button"
                onClick={() => { setShowChoiceModal(false); setShowGuestForm(true); }}
                className="btn-choice-guest"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <User size={18} /> Continue as Guest
              </button>
              
              <button 
                type="button"
                onClick={() => navigate('/login')}
                className="btn-choice-customer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Lock size={18} /> Continue as Regular Customer
              </button>

              <button 
                type="button"
                onClick={() => setShowChoiceModal(false)}
                className="btn-modal-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. GUEST DETAILS FORM MODAL */}
      {showGuestForm && (
        <div className="checkout-modal-overlay" onClick={() => setShowGuestForm(false)}>
          <div className="checkout-modal-box form-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header-title">Guest Delivery Details</h2>
            <p className="modal-header-subtitle">Please fill in your details to complete the delivery.</p>

            <form onSubmit={handleGuestSubmit} className="guest-form">
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label>ID Number (NIC)</label>
                <input required type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} placeholder="199512345678" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="0771234567" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" />
                </div>
              </div>

              <div className="form-group">
                <label>Delivery Location / Address</label>
                <textarea required name="location" value={formData.location} onChange={handleInputChange} placeholder="No. 123, Galle Road, Colombo 03" />
              </div>

              <div className="modal-form-actions">
                <button 
                  type="button" 
                  onClick={() => setShowGuestForm(false)}
                  className="btn-form-back"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button 
                  type="submit" 
                  className="btn-form-submit"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} /> Confirm & Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}