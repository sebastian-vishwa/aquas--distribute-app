import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/common/CartContext';
import { CreditCard, User, Lock, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import './Checkout.css';

export default function Checkout() {
  const { cartItems, removeFromCart } = useCart();
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

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuestSubmit = (e) => {
    e.preventDefault();
    console.log('Guest Order Details:', { customer: formData, items: cartItems, total: totalAmount });
    alert('Order details submitted successfully! (Connecting to payment gateway...)');
    setShowGuestForm(false);
  };

  return (
    <div className="checkout-wrapper">
      <h1 className="checkout-title">Checkout</h1>
      
      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty. Go back to products and add some items!</p>
      ) : (
        <div className="checkout-grid">
          
          {/* Cart Items List */}
          <div className="checkout-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="checkout-item">
                <div>
                  <h3 className="checkout-item-title">{item.title}</h3>
                  <p className="checkout-item-qty">Quantity: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h4 className="checkout-item-price">Rs. {item.price * item.quantity}</h4>
                  <button 
                    type="button"
                    onClick={() => removeFromCart(item.id)} 
                    className="btn-remove-item"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="checkout-summary-box">
            <h2>Order Summary</h2>
            <div className="summary-total-row">
              <span>Total:</span>
              <span>Rs. {totalAmount}</span>
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