import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UnderDevelopment() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '70vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#0A3D91', marginBottom: '1rem' }}>🚧 Under Development 🚧</h1>
      <p style={{ fontSize: '1.2rem', color: '#64748B', maxWidth: '600px', marginBottom: '2rem' }}>
        The payment gateway integration is currently under construction. 
        Please check back later to complete real transactions.
      </p>
      <button 
        onClick={() => navigate('/')} 
        style={{
          padding: '10px 24px',
          backgroundColor: '#16a34a',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '1rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        ← Back to Home
      </button>
    </div>
  );
}