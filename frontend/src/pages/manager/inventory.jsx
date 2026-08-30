import React, { useState, useEffect } from 'react';
import './manager_pages.css';
import AddProduct from "../../components/manager/Addproduct"; // Ensure this path matches your setup

export default function Inventory() {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  
  // 1. State for the live database data
  const [inventoryData, setInventoryData] = useState([]);

  // 2. Fetch function to pull data from your Express backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      // Safety check: ensure the response is an array before setting state
      setInventoryData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setInventoryData([]);
    }
  };

  // 3. Trigger the fetch when the page first loads
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Product & Inventory</h1>
          <p>Manage wholesale catalog and monitor stock levels.</p>
        </div>
        <button className="btn-action" onClick={() => setProductModalOpen(true)}>
          + Add New Product
        </button>
      </div>

      <div className="manager-table-container">
        <table className="manager-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>WHOLESALE PRICE</th>
              <th>CURRENT STOCK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* 4. Map over your live MongoDB data instead of dummy data */}
            {inventoryData.length > 0 ? (
              inventoryData.map((item) => (
                <tr key={item._id}>
                  <td style={{ color: '#0A5C99', fontWeight: '600' }}>{item.productName}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td><strong>${item.wholesalePrice}</strong></td>
                  <td style={{ color: item.currentStock === 0 ? '#DC2626' : 'inherit' }}>
                    {item.currentStock}
                  </td>
                  <td>
                    <span className={`status-pill ${
                      item.status === 'In Stock' ? 'status-active' : 
                      item.status === 'Out of Stock' ? 'status-inactive' : 
                      'status-pending'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => alert(`Editing ${item.productName}`)}>
                      ✏️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  No products in database. Add one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 5. Render the modal and pass the fetchProducts function to refresh the table after saving */}
      {isProductModalOpen && (
        <AddProduct 
          onClose={() => setProductModalOpen(false)} 
          onAdd={fetchProducts} 
        />
      )}
    </div>
  );
}