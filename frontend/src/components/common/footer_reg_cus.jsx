import React from 'react';

export default function FooterRegCus() {
  return (
    <footer style={{ background: '#0F172A', color: '#94A3B8', padding: '3rem 5%', marginTop: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '2rem', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: 'white', margin: '0 0 1rem 0' }}>💧 AquaPure</h2>
          <p style={{ maxWidth: '300px', fontSize: '0.9rem' }}>Enterprise water logistics and delivery platform.</p>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ color: 'white' }}>Platform</h4>
            <span>Dashboard</span>
            <span>Shop</span>
            <span>Tracking</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ color: 'white' }}>Support</h4>
            <span>Help Center</span>
            <span>Contact Us</span>
            <span>Report Issue</span>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
        &copy; 2026 AquaPure Logistics. All rights reserved.
      </div>
    </footer>
  );
}