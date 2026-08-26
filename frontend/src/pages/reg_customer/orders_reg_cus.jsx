import React from 'react';

export default function OrdersRegCus() {
  const orders = [
    { id: '#ORD-9021', date: 'Oct 24, 2026', items: '50x 5 Gal Jugs', total: '$375.00', status: 'In Transit', sClass: 'status-blue' },
    { id: '#ORD-8944', date: 'Oct 17, 2026', items: '20x 5 Gal Jugs, 2x Coolers', total: '$450.00', status: 'Delivered', sClass: 'status-green' },
    { id: '#ORD-8812', date: 'Oct 10, 2026', items: '50x 5 Gal Jugs', total: '$375.00', status: 'Delivered', sClass: 'status-green' },
    { id: '#ORD-8701', date: 'Sep 28, 2026', items: '10x Mineral Water Cases', total: '$120.00', status: 'Cancelled', sClass: 'status-orange' },
  ];

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Order History</h1>
          <p className="portal-subtitle">Review and download invoices for past orders.</p>
        </div>
      </div>

      <div className="portal-table-container">
        <table className="portal-table">
          <thead>
            <tr><th>Order ID</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th>Invoice</th></tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 'bold', color: '#0EA5E9' }}>{o.id}</td>
                <td>{o.date}</td>
                <td>{o.items}</td>
                <td><strong>{o.total}</strong></td>
                <td><span className={`status-pill ${o.sClass}`}>{o.status}</span></td>
                <td><button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>📄</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}