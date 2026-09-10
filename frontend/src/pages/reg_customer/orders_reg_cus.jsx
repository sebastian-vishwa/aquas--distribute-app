import React, { useState, useEffect } from 'react';
import { ShoppingBag, BadgeCheck, Truck, CircleX, RefreshCw, FileText } from "lucide-react";
import "./orders_reg_cus.css";

const API_URL = 'http://localhost:5000/api/orders';

// Maps backend status strings to the CSS classes supported by status-pill
const statusClassMap = {
  'Delivered': 'status-green',
  'In Transit': 'status-blue',
  'Cancelled': 'status-orange',
};

export default function OrdersRegCus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from backend
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error(`Failed to fetch orders (Status: ${res.status})`);
      }
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate dynamic stats from the fetched orders array
  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === 'Delivered').length,
    inTransit: orders.filter((o) => o.status === 'In Transit').length,
    cancelled: orders.filter((o) => o.status === 'Cancelled').length,
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    return new Date(dateValue).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleViewInvoice = (invoiceLink, orderId) => {
    if (!invoiceLink || invoiceLink === '#') {
      alert(`Invoice for order #${orderId} is being prepared.`);
      return;
    }
    window.open(invoiceLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Order History</h1>
          <p className="portal-subtitle">Review and download invoices for past orders.</p>
        </div>
        <button className="refresh-button" onClick={fetchOrders} title="Refresh Orders">
          <RefreshCw size={18} />
          Refresh Orders
        </button>
      </div>

      {/* SUMMARY STATS CARDS */}
      <section className="summary">
        <div className="summary-card">
          <div className="summary-icon blue">
            <ShoppingBag />
          </div>
          <div>
            <p>Total Orders</p>
            <h2>{stats.total}</h2>
            <small>All time</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            <BadgeCheck />
          </div>
          <div>
            <p>Delivered</p>
            <h2 className="green-text">{stats.delivered}</h2>
            <small>This year</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            <Truck />
          </div>
          <div>
            <p>In Transit</p>
            <h2>{stats.inTransit}</h2>
            <small>On the way</small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <CircleX />
          </div>
          <div>
            <p>Cancelled</p>
            <h2 className="orange-text">{stats.cancelled}</h2>
            <small>This year</small>
          </div>
        </div>
      </section>

      {/* ORDERS DATA TABLE */}
      <div className="portal-table-container">
        <table className="portal-table manager-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>ITEMS</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>INVOICE</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#64748B' }}>
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2.5rem', color: '#EF4444' }}>
                  {error}. Please check that the server is running on http://localhost:5000.
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id || o.orderId}>
                  <td style={{ fontWeight: '600', color: '#0EA5E9' }}>
                    #{o.orderId}
                  </td>
                  <td>{formatDate(o.date || o.createdAt)}</td>
                  <td>{o.items} Units</td>
                  <td>
                    <strong>
                      Rs. {Number(o.total || 0).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </strong>
                  </td>
                  <td>
                    <span className={`status-pill ${statusClassMap[o.status] || 'status-blue'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="invoice-button"
                      title="View Invoice"
                      onClick={() => handleViewInvoice(o.invoiceLink, o.orderId)}
                    >
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}