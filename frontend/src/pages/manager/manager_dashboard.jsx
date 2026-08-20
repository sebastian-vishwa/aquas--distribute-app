import React from 'react';
import './manager_pages.css';

export default function ManagerDashboard() {
  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Real-time logistics and inventory health monitoring.</p>
        </div>
      </div>

      <div className="manager-stats-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
        <div className="stat-card">
          <div className="stat-title">Total Revenue <span>💵</span></div>
          <div className="stat-value">$1.24M</div>
          <p style={{color: '#059669', fontSize: '0.8rem'}}>↗ +14.5% from last month</p>
        </div>
        <div className="stat-card">
          <div className="stat-title">Active Deliveries <span>🚚</span></div>
          <div className="stat-value">142</div>
          <p style={{color: '#3B82F6', fontSize: '0.8rem'}}>78% Complete</p>
        </div>
        <div className="stat-card">
          <div className="stat-title">Inventory Health <span>📦</span></div>
          <div className="stat-value">94%</div>
          <p style={{color: '#64748B', fontSize: '0.8rem'}}>2 Low Stock • 1 Restock Pending</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div className="manager-table-container" style={{ flex: 2 }}>
          <h3 style={{ marginBottom: '1rem' }}>Live Fleet Tracking</h3>
          <div style={{ background: '#E2E8F0', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '1rem' }}>
            <span style={{ color: '#64748B' }}>[ Interactive Map Component ]</span>
          </div>
          <table className="manager-table">
            <thead>
              <tr><th>DRIVER ID</th><th>STATUS</th><th>ETA</th></tr>
            </thead>
            <tbody>
              <tr><td>TRK-104 (J. Smith)</td><td><span className="status-pill status-active">En Route</span></td><td>14 mins</td></tr>
              <tr><td>TRK-299 (A. Davis)</td><td><span className="status-pill status-active">Unloading</span></td><td>Arrived</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="manager-table-container" style={{ flex: 1, borderTop: '4px solid #DC2626' }}>
          <h3 style={{ color: '#DC2626', marginBottom: '1.5rem' }}>⚠️ Urgent Alerts</h3>
          <div style={{ padding: '1rem', background: '#FEF2F2', borderRadius: '6px', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => alert('Opening inventory...')}>
            <strong>Critical Low Stock: 5G Jugs</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>Warehouse A inventory below 5%. Replenishment required.</p>
          </div>
          <div style={{ padding: '1rem', background: '#F0F9FF', borderRadius: '6px', cursor: 'pointer' }} onClick={() => alert('Messaging driver...')}>
            <strong>Delayed Delivery: Route 4B</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>TRK-088 reporting heavy traffic. Estimated delay: 45 mins.</p>
          </div>
        </div>
      </div>
    </div>
  );
}