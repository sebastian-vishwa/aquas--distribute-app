import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './manager_pages.css';
import { Pencil, Trash2, X } from 'lucide-react';

export default function Customers() {
  const navigate = useNavigate();
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editData, setEditData] = useState({
      name: '',
      email: '',
      joinDate: '',
      totalOrders: '',
      status: ''
    });
  const handleEdit = (customer) => {
    setEditingCustomer(customer);

    setEditData({
      name: customer.name,
      email: customer.email,
      joinDate: customer.createdAt
        ? new Date(customer.createdAt).toISOString().split('T')[0]
        : '',
      totalOrders: 0,
      status: 'Active'
    });
  };

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setCustomerData(
      customerData.map((customer) =>
        customer._id === editingCustomer._id
          ? {
              ...customer,
              name: editData.name,
              email: editData.email
            }
          : customer
      )
    );

    setEditingCustomer(null);
  };
  
  const handleDelete = (customerId) => {
  const confirmDelete = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (confirmDelete) {
      setCustomerData(
        customerData.filter(
          (customer) => customer._id !== customerId
        )
      );
    }
  };

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
      </div>
          
      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Partners</div><div className="stat-value">{customerData.length}</div></div>
        <div className="stat-card"><div className="stat-title">Active Corporate</div><div className="stat-value">--</div></div>
        <div className="stat-card"><div className="stat-title">Active Retail</div><div className="stat-value">--</div></div>
        <div className="stat-card"><div className="stat-title">Pending Review</div><div className="stat-value">0</div></div>
      </div>

      <div className="manager-table-container">
          <div className="table-top-bar" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <button
              className="btn-action"
              onClick={() => navigate('/register')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '20px 0 18px 0'}}
            >
              + New Customer
            </button>
          </div>

  <table className="manager-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ACCOUNT EMAIL</th>
              <th>JOIN DATE</th>
              <th>TOTAL ORDERS</th>
              <th>STATUS</th>
              <th className="action-column">EDIT</th>
              <th className="action-column">DELETE</th>
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
                  <td className="action-column">
                    <button
                      onClick={() => handleEdit(c)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        color: '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto'
                      }}
                      title="Edit Customer"
                    >
                      <Pencil size={18} />
                    </button>

                  </td>
                  <td className="action-column">
                    <button
                      onClick={() => handleDelete(c._id)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        color: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 'auto'
                      }}
                      title="Delete Customer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
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