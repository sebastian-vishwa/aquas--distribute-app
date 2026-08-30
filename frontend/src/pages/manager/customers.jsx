import React, { useState, useEffect } from 'react';
import './manager_pages.css';

export default function Customers() {
  const [customerData, setCustomerData] = useState([]);

  // Fetch live customers from the database
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/customers');
      const data = await response.json();
      setCustomerData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
      setCustomerData([]);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <div className="manager-header">
        <h1>Customers</h1>
        <button className="btn-action" onClick={() => alert('New Customer Modal')}>+ New Customer</button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Partners</div><div className="stat-value">{customerData.length}</div></div>
        <div className="stat-card"><div className="stat-title">Active Corporate</div><div className="stat-value">--</div></div>
        <div className="stat-card"><div className="stat-title">Active Retail</div><div className="stat-value">--</div></div>
        <div className="stat-card"><div className="stat-title">Pending Review</div><div className="stat-value">0</div></div>
      </div>

      <div className="manager-table-container">
        <table className="manager-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ACCOUNT EMAIL</th>
              <th>JOIN DATE</th>
              <th>TOTAL ORDERS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {customerData.length > 0 ? (
              customerData.map((c, i) => (
                <tr key={c._id}>
                  <td style={{ color: '#0A5C99', fontWeight: '600', cursor: 'pointer' }} onClick={() => alert(`Viewing ${c.name}`)}>
                    {c.name}
                  </td>
                  <td>{c.email}</td>
                  {/* Format the MongoDB createdAt timestamp to a clean date string */}
                  <td>{new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td><strong>0</strong></td> {/* Placeholder until orders are linked */}
                  <td><span className="status-pill status-active">Active</span></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No registered customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}