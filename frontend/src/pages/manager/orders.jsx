import React, { useState } from 'react';
import './manager_pages.css';

export default function Orders() {
  // Placeholder data until you connect it to your backend
  const [ordersData, setOrdersData] = useState([
    { id: '#ORD-1001', customer: 'Apex Traders', date: 'Oct 28, 2026', total: '$450.00', status: 'Pending' },
    { id: '#ORD-1002', customer: 'Global Retail', date: 'Oct 27, 2026', total: '$1,200.00', status: 'Dispatched' }
  ]);

  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Order Management</h1>
          <p>Monitor incoming wholesale requests and dispatch statuses.</p>
        </div>
        <button className="btn-action">+ Create Manual Order</button>
      </div>

      <div className="manager-table-container">
        <table className="manager-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, i) => (
              <tr key={i}>
                <td style={{ color: '#0A5C99', fontWeight: '600' }}>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td><strong>{order.total}</strong></td>
                <td>
                  <span className={`status-pill ${order.status === 'Pending' ? 'status-pending' : 'status-active'}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}