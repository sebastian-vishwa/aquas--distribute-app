import React from 'react';
import { UserPlus, Building2, Users, ShoppingBag, Clock } from 'lucide-react';
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
        <div>
          <h1>Customers</h1>
          <p>Manage commercial accounts, retail partners, and order history.</p>
        </div>
        <button 
          className="btn-action" 
          onClick={() => alert('New Customer Modal')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <UserPlus size={18} /> New Customer
        </button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Partners
            <Users size={18} color="#64748B" />
          </div>
          <div className="stat-value">1,248</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#0A5C99', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Corporate
            <Building2 size={18} color="#0A5C99" />
          </div>
          <div className="stat-value">892</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#3B82F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Retail
            <ShoppingBag size={18} color="#3B82F6" />
          </div>
          <div className="stat-value">315</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#EAB308', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Pending Review
            <Clock size={18} color="#EAB308" />
          </div>
          <div className="stat-value">41</div>
        </div>
      </div>

      <div className="manager-table-container">
        <table className="manager-table">
          <thead>
            <tr><th>NAME</th><th>TYPE</th><th>LAST ORDER DATE</th><th>TOTAL ORDERS</th><th>STATUS</th></tr>
          </thead>
          <tbody>
            {customerData.map((c, i) => (
              <tr key={i}>
                <td 
                  style={{ color: '#0A5C99', fontWeight: '600', cursor: 'pointer' }} 
                  onClick={() => alert(`Viewing ${c.name}`)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {c.type === 'Corporate' ? <Building2 size={16} color="#0A5C99" /> : <ShoppingBag size={16} color="#3B82F6" />}
                    {c.name}
                  </div>
                </td>
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