import React, { useState, useEffect } from 'react';
import { ShoppingBag, BadgeCheck, Truck, CircleX, RefreshCw, FileText } from "lucide-react";
import "./orders_reg_cus.css";
const API_URL = 'http://localhost:5000/api/orders';

// Maps backend status strings to the CSS classes your status-pill already supports
const statusClassMap = {
  'Ordered': 'status-blue',
  'Dispatched': 'status-blue',
  'In Transit': 'status-blue',
  'Delivered': 'status-green',
  'Cancelled': 'status-orange',
};

export default function OrdersRegCus() {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({ total: 0, delivered: 0, inTransit: 0, cancelled: 0 });
  const [loading, setLoading] = useState(true);
  const [invoiceLoadingId, setInvoiceLoadingId] = useState(null);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const [ordersRes, summaryRes] = await Promise.all([
        fetch(API_URL, { headers: authHeaders() }),
        fetch(`${API_URL}/summary`, { headers: authHeaders() }),
      ]);
      const ordersData = await ordersRes.json();
      const summaryData = await summaryRes.json();
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setSummary(summaryData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatItems = (items) =>
    items.map((i) => `${i.quantity}x ${i.productName}`).join(', ');

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const handleViewInvoice = async (orderId) => {
    setInvoiceLoadingId(orderId);
    try {
      const res = await fetch(`${API_URL}/${orderId}/invoice`, { headers: authHeaders() });
      if (res.ok) {
        const invoice = await res.json();
        // Simple approach for now — open a printable view in a new tab.
        // Swap this for a proper invoice modal/PDF later if needed.
        const win = window.open('', '_blank');
        win.document.write(`
          <h2>Invoice ${invoice.invoiceNumber}</h2>
          <p>Bill to: ${invoice.billTo.company} (${invoice.billTo.email})</p>
          <p>Address: ${invoice.billTo.address || 'N/A'}</p>
          <ul>${invoice.items.map((i) => `<li>${i.quantity}x ${i.productName} — $${i.unitPrice.toFixed(2)} each</li>`).join('')}</ul>
          <p>Subtotal: $${invoice.subtotal.toFixed(2)}</p>
          <p>Delivery: $${invoice.deliveryFee.toFixed(2)}</p>
          <h3>Total: $${invoice.total.toFixed(2)}</h3>
        `);
      } else {
        console.error('Failed to load invoice');
      }
    } catch (error) {
      console.error('Invoice error:', error);
    } finally {
      setInvoiceLoadingId(null);
    }
  };

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Order History</h1>
          <p className="portal-subtitle">Review and download invoices for past orders.</p>
        </div>
        <button className="refresh-button" onClick={fetchOrders}>
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
            <h2>{summary.total}</h2>
            <small>All time</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon green">
            <BadgeCheck />
          </div>
          <div>
            <p>Delivered</p>
            <h2 className="green-text">{summary.delivered}</h2>
            <small>This year</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon blue">
            <Truck />
          </div>
          <div>
            <p>In Transit</p>
            <h2>{summary.inTransit}</h2>
            <small>On the way</small>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon orange">
            <CircleX />
          </div>
          <div>
            <p>Cancelled</p>
            <h2 className="orange-text">{summary.cancelled}</h2>
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
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No orders yet.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td style={{ fontWeight: 'bold', color: '#0EA5E9' }}>
                    ORD-{o._id.slice(-4).toUpperCase()}
                  </td>
                  <td>{formatDate(o.createdAt)}</td>
                  <td>{formatItems(o.items)}</td>
                  <td><strong>${o.total.toFixed(2)}</strong></td>
                  <td><span className={`status-pill ${statusClassMap[o.status] || 'status-blue'}`}>{o.status}</span></td>
                  <td>
                    <button
                      className="invoice-button"
                      title="View Invoice"
                      onClick={() => handleViewInvoice(o._id)}
                      disabled={invoiceLoadingId === o._id}
                    >
                      <FileText size={19} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div >
  );
}