import React from 'react';
import { Download, FileText, DollarSign, Truck, Repeat, Users } from 'lucide-react';
import './manager_pages.css';

export default function Reports() {
  const reports = [
    { id: 'REP-2026-104', date: 'Oct 24, 2026', type: 'Financial', color: '#3B82F6' },
    { id: 'REP-2026-103', date: 'Oct 17, 2026', type: 'Logistics', color: '#8B5CF6' },
    { id: 'REP-2026-102', date: 'Oct 10, 2026', type: 'Inventory', color: '#D97706' }
  ];

  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Comprehensive overview of wholesale operations and financial performance.</p>
        </div>
        <button 
          className="btn-action" 
          style={{ background: '#1E3A8A', display: 'flex', alignItems: 'center', gap: '8px' }} 
          onClick={() => alert('Exporting PDF...')}
        >
          <Download size={18} /> Export PDF/CSV
        </button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Revenue
            <DollarSign size={18} color="#059669" />
          </div>
          <div className="stat-value">$2.4M</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Completed Deliveries
            <Truck size={18} color="#3B82F6" />
          </div>
          <div className="stat-value">8,432</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Inventory Turnover
            <Repeat size={18} color="#8B5CF6" />
          </div>
          <div className="stat-value">4.2x</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Wholesalers
            <Users size={18} color="#D97706" />
          </div>
          <div className="stat-value">145</div>
        </div>
      </div>

      <div className="manager-table-container">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#0A5C99" /> Recent Transaction Reports
        </h3>
        <table className="manager-table">
          <thead>
            <tr><th>REPORT ID</th><th>GENERATED DATE</th><th>TYPE</th></tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} style={{ cursor: 'pointer' }} onClick={() => alert(`Opening report ${r.id}`)}>
                <td style={{ color: '#0A5C99', fontWeight: '600' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText size={16} color={r.color} />
                    {r.id}
                  </div>
                </td>
                <td>{r.date}</td>
                <td>
                  <span style={{ background: `${r.color}22`, color: r.color, padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {r.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}