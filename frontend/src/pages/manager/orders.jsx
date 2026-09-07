import React, { useState, useEffect } from 'react';
import './manager_pages.css';
import { Pencil, Trash2, Eye, X } from 'lucide-react';

export default function Orders() {

  // Order table data
  const [ordersData, setOrdersData] = useState([
    {
      id: '#ORD-1001',
      customer: 'Apex Traders',
      date: 'Oct 28, 2026',
      total: '$450.00',
      status: 'Pending'
    },
    {
      id: '#ORD-1002',
      customer: 'Global Retail',
      date: 'Oct 27, 2026',
      total: '$1,200.00',
      status: 'Dispatched'
    }
  ]);

  // Edit popup
  const [editingOrder, setEditingOrder] = useState(null);

  // Create popup
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [products, setProducts] = useState([]);

  // Edit form
  const [editData, setEditData] = useState({
    customer: '',
    date: '',
    total: '',
    status: ''
  });

  // Create form
  const [newOrder, setNewOrder] = useState({
  customer: '',
  product: '',
  date: '',
  total: '',
  status: 'Pending'
   });


  // ==========================================
  // EDIT ORDER
  // ==========================================

  const handleEdit = (order) => {

    setEditingOrder(order);

    setEditData({
      customer: order.customer,
      date: order.date,
      total: order.total,
      status: order.status
    });
  };


  const handleEditChange = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };


  const handleSave = () => {

    setOrdersData(
      ordersData.map((order) =>
        order.id === editingOrder.id
          ? {
              ...order,
              customer: editData.customer,
              date: editData.date,
              total: editData.total,
              status: editData.status
            }
          : order
      )
    );

    setEditingOrder(null);
  };


  // ==========================================
  // CREATE MANUAL ORDER
  // ==========================================

  const handleCreateChange = (e) => {

    setNewOrder({
      ...newOrder,
      [e.target.name]: e.target.value
    });
  };


  const handleCreateOrder = (e) => {

    e.preventDefault();

    // Basic validation
    if (
        !newOrder.customer ||       
        !newOrder.date ||
        !newOrder.total) 
       {alert('Please fill in all required fields.');
        return;
       }

    // Create new order ID
    const newIdNumber = 1001 + ordersData.length;

    const createdOrder = {
      id: `#ORD-${newIdNumber}`,
      customer: newOrder.customer,
      product: '',
      date: newOrder.date,
      total: newOrder.total.startsWith('$')
        ? newOrder.total
        : `$${newOrder.total}`,
      status: newOrder.status
    };

    // Add new order to table
    setOrdersData([
      ...ordersData,
      createdOrder
    ]);

    // Clear form
    setNewOrder({
    customer: '',
    product: '',
    date: '',
    total: '',
    status: 'Pending'
     });

    // Close popup
    setShowCreateOrder(false);
  };


  // ==========================================
  // DELETE ORDER
  // ==========================================

  const handleDelete = (orderId) => {

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this order?'
    );

    if (confirmDelete) {

      setOrdersData(
        ordersData.filter(
          (order) => order.id !== orderId
        )
      );
    }
  };


  // ==========================================
  // VIEW ORDER
  // ==========================================

  const handleView = (order) => {

    alert(
      `Order ID: ${order.id}\n` +
      `Customer: ${order.customer}\n` +
      `Date: ${order.date}\n` +
      `Total: ${order.total}\n` +
      `Status: ${order.status}`
    );
  };

  useEffect(() => {
  fetchProducts();
}, []);

const fetchProducts = async () => {
  try {
    const response = await fetch(
      'http://localhost:5000/api/products'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    setProducts(data);

  } catch (error) {
    console.error('Error fetching products:', error);
  }
};
  return (
    <div>

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="manager-header">

        <div>

          <h1>Order Management</h1>

          <p>
            Monitor incoming wholesale requests and dispatch statuses.
          </p>

        </div>

      </div>


      {/* ======================================
          TABLE
      ====================================== */}

      <div className="manager-table-container">

        {/* Create Manual Order Button */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '100%'
          }}
        >

          <button
            className="btn-action"
            onClick={() => setShowCreateOrder(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              margin: '20px 0 18px 0'
            }}
          >
            + Create Manual Order
          </button>

        </div>


        <table className="manager-table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>CUSTOMER</th>
              <th>PRODUCT</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th>ORDER VIEW</th>
              <th className="action-column">EDIT</th>
              <th className="action-column">DELETE</th>
            </tr>
          </thead>
          <tbody>

            {ordersData.map((order) => (

              <tr key={order.id}>

                <td
                  style={{
                    color: '#0A5C99',
                    fontWeight: '600'
                  }}
                >
                  {order.id}
                </td>

                <td>
                  {order.customer}
                </td>

                <td>
                  {order.product || ''}
                </td>

                <td>
                  {order.date}
                </td>

                <td>
                  <strong>
                    {order.total}
                  </strong>
                </td>

                <td>

                  <span
                    className={`status-pill ${
                      order.status === 'Pending'
                        ? 'status-pending'
                        : 'status-active'
                    }`}
                  >
                    {order.status}
                  </span>

                </td>


                {/* VIEW */}

                <td>

                  <button
                    onClick={() => handleView(order)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: '#64748B'
                    }}
                    title="View Order"
                  >
                    <Eye size={20} />
                  </button>

                </td>


                {/* EDIT */}

                <td className="action-column">

                  <button
                    onClick={() => handleEdit(order)}
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
                    title="Edit Order"
                  >
                    <Pencil size={18} />
                  </button>

                </td>


                {/* DELETE */}

                <td className="action-column">

                  <button
                    onClick={() => handleDelete(order.id)}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      color: '#ff0000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 'auto'
                    }}
                    title="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* ======================================
          CREATE MANUAL ORDER POPUP
      ====================================== */}

      {showCreateOrder && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >

          <div
            style={{
              background: '#fff',
              width: '450px',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >

            {/* Popup Header */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >

              <h2>
                Create Manual Order
              </h2>

              <button
                type="button"
                onClick={() => setShowCreateOrder(false)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>

            </div>


            {/* Customer */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Customer *
              </label>

              <input
                type="text"
                name="customer"
                placeholder="Enter customer name"
                value={newOrder.customer}
                onChange={handleCreateChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            
            {/* Product */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Product *
              </label>

              <select
                name="product"
                value={newOrder.product}
                onChange={handleCreateChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              >

                <option value="">
                  Select a product
                </option>

                {products.map((product) => (
                  <option
                    key={product.id}
                    value={product.id}
                  >
                    {product.name}
                  </option>
                ))}

              </select>

            </div>

            {/* Date */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Order Date *
              </label>

              <input
                type="date"
                name="date"
                value={newOrder.date}
                onChange={handleCreateChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />

            </div>


            {/* Total */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Total *
              </label>

              <input
                type="number"
                name="total"
                placeholder="Enter order total"
                min="0"
                step="0.01"
                value={newOrder.total}
                onChange={handleCreateChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />

            </div>


            {/* Status */}

            <div style={{ marginBottom: '20px' }}>

              <label>
                Status
              </label>

              <select
                name="status"
                value={newOrder.status}
                onChange={handleCreateChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Dispatched">
                  Dispatched
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>


            {/* Buttons */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}
            >

              <button
                type="button"
                onClick={() => setShowCreateOrder(false)}
                style={{
                  padding: '10px 18px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={handleCreateOrder}
                className="btn-action"
                style={{
                  padding: '10px 20px'
                }}
              >
                Create Order
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ======================================
          EDIT ORDER POPUP
      ====================================== */}

      {editingOrder && (

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >

          <div
            style={{
              background: '#fff',
              width: '450px',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >

            {/* Header */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >

              <h2>
                Edit Order
              </h2>

              <button
                onClick={() => setEditingOrder(null)}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={22} />
              </button>

            </div>


            {/* Order ID */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Order ID
              </label>

              <input
                type="text"
                value={editingOrder.id}
                disabled
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box',
                  background: '#f3f4f6'
                }}
              />

            </div>


            {/* Customer */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Customer
              </label>

              <input
                type="text"
                name="customer"
                value={editData.customer}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />

            </div>


            {/* Date */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Date
              </label>

              <input
                type="text"
                name="date"
                value={editData.date}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />

            </div>


            {/* Total */}

            <div style={{ marginBottom: '15px' }}>

              <label>
                Total
              </label>

              <input
                type="text"
                name="total"
                value={editData.total}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              />

            </div>


            {/* Status */}

            <div style={{ marginBottom: '20px' }}>

              <label>
                Status
              </label>

              <select
                name="status"
                value={editData.status}
                onChange={handleEditChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  marginTop: '5px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  boxSizing: 'border-box'
                }}
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Dispatched">
                  Dispatched
                </option>

                <option value="Delivered">
                  Delivered
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>


            {/* Buttons */}

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '10px'
              }}
            >

              <button
                onClick={() => setEditingOrder(null)}
                style={{
                  padding: '10px 18px',
                  border: '1px solid #ccc',
                  background: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>


              <button
                onClick={handleSave}
                className="btn-action"
                style={{
                  padding: '10px 20px'
                }}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}