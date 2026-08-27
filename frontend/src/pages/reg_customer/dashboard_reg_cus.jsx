import React from 'react';

export default function DashboardRegCus() {
  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Welcome back, Apex Traders</h1>
        </div>
        <button style={{ background: '#0EA5E9', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>🛒 Quick Reorder</button>
      </div>

      <div className="portal-grid">
        <div className="portal-card">
          <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>ACTIVE SUBSCRIPTION</p>
          <h2 style={{ fontSize: '2.5rem', color: '#1E3A8A', margin: '0.5rem 0' }}>20 Jugs <span style={{fontSize: '1rem', color: '#64748B'}}>/ week</span></h2>
          <a href="#" style={{ color: '#0EA5E9', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}>Manage Subscription &gt;</a>
        </div>
        <div className="portal-card">
          <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>SAVINGS YTD</p>
          <h2 style={{ fontSize: '2.5rem', color: '#10B981', margin: '0.5rem 0' }}>$1,245.50</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>vs retail pricing</p>
        </div>
        <div className="portal-card">
          <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>EMPTY JUG RETURNS</p>
           <h2 style={{ fontSize: '2.5rem', color: '#1E3A8A', margin: '0.5rem 0' }}>14 Jugs </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>Ready for driver pickup</p>
        </div>
        <div className="portal-card">
          <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>ACCOUNT DETAILS</p>
          <div style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
            <strong>Company:</strong> Apex Traders LLC<br/>
            <strong>Contact:</strong> Jane Doe<br/>
            <strong>Billing:</strong> 123 Logistics Way, Chicago IL
          </div>
        </div>
        
      </div>
    </div>
  );
}