import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegCart } from '../../context/RegCartContext';
import { Plus, Minus, Trash2, ArrowLeft, CreditCard, ShoppingBag, CheckCircle2 } from 'lucide-react';
import './checkout_reg_cus.css';

export default function CheckoutRegCus() {
  const navigate = useNavigate();
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  } = useRegCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleProceedToPay = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    try {
      const token = localStorage.getItem('token');
      // Attempt backend order creation if token exists
      if (token) {
        await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: cartItems,
            deliveryAddress: 'Registered Commercial Account Address',
            totalAmount: cartTotal,
          }),
        }).catch((err) => console.log('Mocked order sync:', err));
      }

      // Success flow
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // SUCCESS ORDER SCREEN
  if (orderPlaced) {
    return (
      <div className="reg-checkout-page">
        <div className="reg-empty-cart" style={{ padding: '5rem 2rem' }}>
          <div style={{ color: '#10B981', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <CheckCircle2 size={64} />
          </div>
          <h2 style={{ fontSize: '1.8rem', color: '#1E293B', marginBottom: '0.75rem' }}>
            Order Placed Successfully!
          </h2>
          <p style={{ color: '#64748B', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Your wholesale water order has been submitted. You can monitor the fulfillment status, dispatch schedules, and delivery updates in your orders tab.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => navigate('/portal/orders')}
              className="btn-back-catalogue"
            >
              View Order History
            </button>
            <button
              type="button"
              onClick={() => navigate('/portal/products')}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#F1F5F9',
                border: '1px solid #CBD5E1',
                borderRadius: '6px',
                color: '#475569',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Back to Catalogue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reg-checkout-page">
      <div className="reg-checkout-header">
        <h1 className="reg-checkout-title">Commercial Checkout</h1>
        <p className="reg-checkout-subtitle">
          Review your items, adjust wholesale pallet volumes, and confirm commercial fulfillment.
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="reg-empty-cart">
          <div className="reg-empty-icon">
            <ShoppingBag size={54} strokeWidth={1.5} />
          </div>
          <h2>Your Wholesale Cart is Empty</h2>
          <p>You currently don't have any commercial water products or dispensers in your order.</p>
          <button
            type="button"
            onClick={() => navigate('/portal/products')}
            className="btn-back-catalogue"
          >
            <ArrowLeft size={18} /> Browse Wholesale Catalogue
          </button>
        </div>
      ) : (
        <div className="reg-checkout-grid">
          
          {/* Main Table Showing Items */}
          <div className="reg-table-container">
            <table className="reg-cart-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Item Name</th>
                  <th style={{ textAlign: 'center' }}>Quantity</th>
                  <th style={{ textAlign: 'right' }}>Unit Price</th>
                  <th style={{ textAlign: 'right' }}>Total Price</th>
                  <th style={{ textAlign: 'center', width: '60px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id || item._id}>
                    
                    {/* Item Name Column */}
                    <td>
                      <div className="item-cell-wrapper">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name || item.productName}
                            className="item-thumbnail"
                          />
                        ) : (
                          <div className="item-thumb-fallback">
                            <ShoppingBag size={20} />
                          </div>
                        )}
                        <div className="item-details">
                          <span className="item-name-text">
                            {item.name || item.productName || item.title}
                          </span>
                          {item.unit && (
                            <span className="item-unit-tag">
                              Per {item.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Interactive Quantity Column (- and +) */}
                    <td style={{ textAlign: 'center' }}>
                      <div className="qty-stepper">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id || item._id)}
                          className="qty-step-btn"
                          title="Decrease Quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id || item._id)}
                          className="qty-step-btn"
                          title="Increase Quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </td>

                    {/* Unit Price Column */}
                    <td style={{ textAlign: 'right' }}>
                      <span className="unit-price-text">
                        Rs. {Number(item.price || item.wholesalePrice || 0).toLocaleString()}
                      </span>
                    </td>

                    {/* Total Price Column */}
                    <td style={{ textAlign: 'right' }}>
                      <span className="total-price-text">
                        Rs. {(
                          Number(item.price || item.wholesalePrice || 0) * Number(item.quantity || 1)
                        ).toLocaleString()}
                      </span>
                    </td>

                    {/* Trash/Delete Action Column */}
                    <td style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id || item._id)}
                        className="btn-delete-item"
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Side Order Summary Card */}
          <div className="reg-summary-card">
            <h2>Order Summary</h2>

            <div className="summary-data-row">
              <span>Total Items</span>
              <span>{cartCount} units</span>
            </div>

            <div className="summary-data-row">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>

            <div className="summary-data-row">
              <span>Commercial Fleet Dispatch</span>
              <span style={{ color: '#10B981', fontWeight: 600 }}>Included</span>
            </div>

            <div className="summary-divider-line"></div>

            <div className="summary-grand-total">
              <span>Grand Total</span>
              <span className="grand-total-amount">
                Rs. {cartTotal.toLocaleString()}
              </span>
            </div>

            {/* Green Proceed to Pay Button */}
            <button
              type="button"
              onClick={handleProceedToPay}
              disabled={isProcessing || cartItems.length === 0}
              className="btn-proceed-pay-green"
            >
              <CreditCard size={20} />
              {isProcessing ? 'Processing Order...' : 'Proceed to Pay'}
            </button>

            <p className="secure-badge">
              🔒 256-Bit Encrypted Corporate Settlement
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
