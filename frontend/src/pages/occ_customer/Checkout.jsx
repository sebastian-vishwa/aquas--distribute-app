import React from 'react';
import { useCart } from '../../components/common/CartContext';

export default function Checkout() {
  const { cartItems, removeFromCart } = useCart();

  // Total price eka hadaganna
  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div style={{ padding: '4rem 8%', background: '#f8fafc', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '2rem', color: '#1e293b' }}>Checkout</h1>
      
      {cartItems.length === 0 ? (
        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Your cart is empty. Go back to products and add some items!</p>
      ) : (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          
          {/* Items List Eka */}
          <div style={{ flex: '1', minWidth: '300px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>{item.title}</h3>
                  <p style={{ margin: '0', color: '#64748b' }}>Quantity: {item.quantity}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>Rs. {item.price * item.quantity}</h4>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', padding: 0 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Total Eka */}
          <div style={{ width: '300px', background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', color: '#1e293b' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a' }}>
              <span>Total:</span>
              <span>Rs. {totalAmount}</span>
            </div>
            <button style={{ width: '100%', padding: '1rem', background: '#16a34a', color: 'white', border: 'none', borderRadius: '6px', marginTop: '2rem', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' }}>
              Proceed to Pay 💳
            </button>
          </div>

        </div>
      )}
    </div>
  );
}