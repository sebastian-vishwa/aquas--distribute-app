import React from 'react';

export default function DeliveriesRegCus() {
  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Active Deliveries</h1>
          <p className="portal-subtitle">Track your ongoing wholesale shipments.</p>
        </div>
      </div>

      {/* Tracking Card 1 - In Transit */}
      <div className="tracking-card">
        <div className="tracking-info">
          <h3>TRK-9021-X</h3>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>ETA: Today, 3:00 PM</p>
          <p style={{ color: '#1E293B', fontWeight: '600', marginTop: '0.5rem' }}>50x 5-Gallon Jugs</p>
        </div>
        
        <div className="tracking-steps">
          <div className="step completed"><div className="step-circle">✓</div><div className="step-line"></div><span className="step-label">Ordered</span></div>
          <div className="step completed"><div className="step-circle">✓</div><div className="step-line"></div><span className="step-label">Dispatched</span></div>
          <div className="step active"><div className="step-circle">🚚</div><div className="step-line" style={{background: '#E2E8F0'}}></div><span className="step-label">In Transit</span></div>
          <div className="step"><div className="step-circle"></div><span className="step-label">Delivered</span></div>
        </div>
      </div>

      {/* Tracking Card 2 - Dispatched */}
      <div className="tracking-card">
        <div className="tracking-info">
          <h3>TRK-8842-Y</h3>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>ETA: Tomorrow, 10:00 AM</p>
          <p style={{ color: '#1E293B', fontWeight: '600', marginTop: '0.5rem' }}>2x Industrial Dispensers</p>
        </div>
        
        <div className="tracking-steps">
          <div className="step completed"><div className="step-circle">✓</div><div className="step-line"></div><span className="step-label">Ordered</span></div>
          <div className="step active"><div className="step-circle">📦</div><div className="step-line" style={{background: '#E2E8F0'}}></div><span className="step-label">Dispatched</span></div>
          <div className="step"><div className="step-circle"></div><div className="step-line" style={{background: '#E2E8F0'}}></div><span className="step-label">In Transit</span></div>
          <div className="step"><div className="step-circle"></div><span className="step-label">Delivered</span></div>
        </div>
      </div>
    </div>
  );
}