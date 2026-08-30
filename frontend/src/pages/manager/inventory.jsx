import React, { useState, useEffect } from "react";
import { Plus, Pencil, Package } from "lucide-react";
import './manager_pages.css';
import AddProduct from "../../components/manager/Addproduct";

export default function Inventory() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Product & Inventory</h1>
          <p>Manage wholesale catalog and monitor stock levels.</p>
        </div>
        <button 
          className="btn-action" 
          onClick={() => setShowAddProduct(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={18} /> Add New Product
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
            {products.length > 0 ? (
              products.map((item) => (
                <tr key={item._id}>
                  <td style={{ color: '#0A5C99', fontWeight: '600' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Package size={16} color="#0A5C99" />
                      {item.productName}
                    </div>
                  </td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td><strong>Rs. {item.wholesalePrice?.toLocaleString()}</strong></td>
                  <td style={{ color: item.currentStock <= (item.reorderLevel || 10) ? '#DC2626' : 'inherit' }}>
                    {item.currentStock}
                  </td>
                  <td>
                    <span className={`status-pill ${item.status === 'In Stock' ? 'status-active' : item.status === 'Low Stock' ? 'status-pending' : 'status-inactive'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }} 
                      onClick={() => alert(`Editing ${item.productName}`)}
                      title="Edit Product"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
                  No products found in inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddProduct && (
        <AddProduct
          onClose={() => setShowAddProduct(false)}
          onAdd={fetchInventory}
        />
      )}
    </div>
  );
}