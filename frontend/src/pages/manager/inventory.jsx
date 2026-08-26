import React, { useState } from "react";
import './manager_pages.css';
import AddProduct from "c:/Users/Administrator/OneDrive/Documents/aqus/aquas--distribute-app/frontend/src/components/manager/Addproduct"
;

export default function Inventory() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const inventoryData = [
    { name: 'Premium 5-Gallon Dispenser Jar', sku: 'AQ-5G-PRM', cat: '5-Gallon', price: '$5.50', stock: '1,245', status: 'In Stock', statusClass: 'status-active' },
    { name: 'Pure Mineral 1L Case (24 Pk)', sku: 'AQ-1L-CS24', cat: '1L Bottles', price: '$12.00', stock: '42', status: 'Low Stock', statusClass: 'status-pending' },
    { name: 'Industrial Hot/Cold Dispenser Pro', sku: 'AQ-DSP-HCPRO', cat: 'Dispensers', price: '$185.00', stock: '0', status: 'Out of Stock', statusClass: 'status-inactive' }
  ];
  const [products, setProducts] = useState(inventoryData);
  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Product & Inventory</h1>
          <p>Manage wholesale catalog and monitor stock levels.</p>
        </div>
        <button className="btn-action" onClick={() => setShowAddProduct(true)}>+ Add New Product</button>
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
            {inventoryData.map((item, index) => (
              <tr key={index}>
                <td style={{ color: '#0A5C99', fontWeight: '600' }}>{item.name}</td>
                <td>{item.sku}</td>
                <td>{item.cat}</td>
                <td><strong>{item.price}</strong></td>
                <td style={{ color: item.stock === '0' || item.stock === '42' ? '#DC2626' : 'inherit' }}>{item.stock}</td>
                <td><span className={`status-pill ${item.statusClass}`}>{item.status}</span></td>
                <td>
                  <button style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }} onClick={() => alert(`Editing ${item.name}`)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddProduct && (
  <AddProduct
    onClose={() => setShowAddProduct(false)}
    onAdd={(newProduct) => {

            setProducts((previousProducts) => [
                ...previousProducts,
                newProduct
            ]);

            setShowAddProduct(false);
        }}
  />
)}
    </div>
  );
}