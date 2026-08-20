import React from 'react';
import './manager_pages.css';

export default function Customers() {
  const customerData = [
    { name: 'Apex Industrial Supply', type: 'Corporate', date: 'Oct 24, 2026', orders: '1,432', status: 'Active', sClass: 'status-active' },
    { name: 'Blue Ridge Grocers', type: 'Retail', date: 'Oct 23, 2026', orders: '854', status: 'Active', sClass: 'status-active' },
    { name: 'Cascade Distribution Hub', type: 'Corporate', date: 'Oct 20, 2026', orders: '2,105', status: 'Inactive', sClass: 'status-inactive' },
    { name: 'Summit Logistics Partners', type: 'Corporate', date: 'Oct 15, 2026', orders: '3,890', status: 'Pending', sClass: 'status-pending' }
  ];

  return (
    <div>
      <div className="manager-header">
        <h1>Customers</h1>
        <button className="btn-action" onClick={() => alert('New Customer Modal')}>+ New Customer</button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Partners</div><div className="stat-value">1,248</div></div>
        <div className="stat-card"><div className="stat-title">Active Corporate</div><div className="stat-value">892</div></div>
        <div className="stat-card"><div className="stat-title">Active Retail</div><div className="stat-value">315</div></div>
        <div className="stat-card"><div className="stat-title">Pending Review</div><div className="stat-value">41</div></div>
      </div>

      <div className="manager-table-container">
        <table className="manager-table">
          <thead>
            <tr><th>NAME</th><th>TYPE</th><th>LAST ORDER DATE</th><th>TOTAL ORDERS</th><th>STATUS</th></tr>
          </thead>
          <tbody>
            {customerData.map((c, i) => (
              <tr key={i}>
                <td style={{ color: '#0A5C99', fontWeight: '600', cursor: 'pointer' }} onClick={() => alert(`Viewing ${c.name}`)}>{c.name}</td>
                <td>{c.type}</td>
                <td>{c.date}</td>
                <td><strong>{c.orders}</strong></td>
                <td><span className={`status-pill ${c.sClass}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}