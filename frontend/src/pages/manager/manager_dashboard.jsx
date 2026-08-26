import React from 'react';
import { 
  DollarSign, 
  Truck, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Clock 
} from 'lucide-react';
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

      <div className="manager-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* Total Revenue */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Revenue 
            <span style={{ color: '#059669', display: 'flex', alignItems: 'center' }}>
              <DollarSign size={18} />
            </span>
          </div>
          <div className="stat-value">$1.24M</div>
          <p style={{ color: '#059669', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={14} /> +14.5% from last month
          </p>
        </div>

        {/* Active Deliveries */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Deliveries 
            <span style={{ color: '#3B82F6', display: 'flex', alignItems: 'center' }}>
              <Truck size={18} />
            </span>
          </div>
          <div className="stat-value">142</div>
          <p style={{ color: '#3B82F6', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <Clock size={14} /> 78% Complete
          </p>
        </div>

        {/* Inventory Health */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Inventory Health 
            <span style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
              <Package size={18} />
            </span>
          </div>
          <div className="stat-value">94%</div>
          <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>
            2 Low Stock • 1 Restock Pending
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Fleet Tracking Map & Table */}
        <div className="manager-table-container" style={{ flex: 2 }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#0A3D91" /> Live Fleet Tracking
          </h3>
          <div style={{ background: '#E2E8F0', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', marginBottom: '1rem' }}>
            <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} /> [ Interactive Map Component ]
            </span>
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
        
        {/* Urgent Alerts */}
        <div className="manager-table-container" style={{ flex: 1, borderTop: '4px solid #DC2626' }}>
          <h3 style={{ color: '#DC2626', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#DC2626" /> Urgent Alerts
          </h3>
          <div style={{ padding: '1rem', background: '#FEF2F2', borderRadius: '6px', marginBottom: '1rem', cursor: 'pointer', border: '1px solid #FECACA' }} onClick={() => alert('Opening inventory...')}>
            <strong style={{ color: '#991B1B' }}>Critical Low Stock: 5G Jugs</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#7F1D1D' }}>Warehouse A inventory below 5%. Replenishment required.</p>
          </div>
          <div style={{ padding: '1rem', background: '#F0F9FF', borderRadius: '6px', cursor: 'pointer', border: '1px solid #BAE6FD' }} onClick={() => alert('Messaging driver...')}>
            <strong style={{ color: '#0369A1' }}>Delayed Delivery: Route 4B</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#075985' }}>TRK-088 reporting heavy traffic. Estimated delay: 45 mins.</p>
          </div>
        </div>
      </div>
    </div>
  );
}