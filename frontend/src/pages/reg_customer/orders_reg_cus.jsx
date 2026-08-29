import React from 'react';
import { ShoppingBag, BadgeCheck, Truck, CircleX, RefreshCw, FileText } from "lucide-react";
import "./portal.css";
export default function OrdersRegCus() {
  const orders = [
    { id: 'ORD-9021', date: 'Oct 24, 2026', items: '50x 5 Gal Jugs', total: '$375.00', status: 'In Transit', sClass: 'status-blue' },
    { id: 'ORD-8944', date: 'Oct 17, 2026', items: '20x 5 Gal Jugs, 2x Coolers', total: '$450.00', status: 'Delivered', sClass: 'status-green' },
    { id: 'ORD-8812', date: 'Oct 10, 2026', items: '50x 5 Gal Jugs', total: '$375.00', status: 'Delivered', sClass: 'status-green' },
    { id: 'ORD-8701', date: 'Sep 28, 2026', items: '10x Mineral Water Cases', total: '$120.00', status: 'Cancelled', sClass: 'status-orange' },
  ];

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Order History</h1>
          <p className="portal-subtitle">Review and download invoices for past orders.</p>
        </div>
        <button className="refresh-button">
          <RefreshCw size={18} />
          Refresh Products
        </button>
      </div>
      {/* SUMMARY CARDS */}
      <section className="summary">

        <div className="summary-card">
          <div className="summary-icon blue">
            <ShoppingBag />
          </div>
          <div>
            <p>Total Orders</p>
            <h2>24</h2>
            <small>All time</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon green">
            <BadgeCheck />
          </div>
          <div>
            <p>Delivered</p>
            <h2 className="green-text">16</h2>
            <small>This year</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon blue">
            <Truck />
          </div>
          <div>
            <p>In Transit</p>
            <h2>5</h2>
            <small>On the way</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon orange">
            <CircleX />
          </div>
          <div>
            <p>Cancelled</p>
            <h2 className="orange-text">3</h2>
            <small>This year</small>
          </div>
        </div>
      </section>

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
                <td><button className ="invoice-button" title="View Invoice" > <FileText size={19} /> </button></td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    </div >
  );
}