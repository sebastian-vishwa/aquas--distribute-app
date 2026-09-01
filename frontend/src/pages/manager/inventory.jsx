import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Package, X } from "lucide-react";
import './manager_pages.css';
import AddProduct from "../../components/manager/Addproduct";

export default function Inventory() {
 const [showAddProduct, setShowAddProduct] = useState(false);
 const [products, setProducts] = useState([]);

 const [editingProduct, setEditingProduct] = useState(null);

 const [editData, setEditData] = useState({
    productName: '',
    sku: '',
    category: '',
    wholesalePrice: '',
    currentStock: '',
    status: ''
  });

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch inventory:", error);
    }
  };

  const handleEdit = (product) => {
  setEditingProduct(product);
    setEditData({
      productName: product.productName,
      sku: product.sku,
      category: product.category,
      wholesalePrice: product.wholesalePrice,
      currentStock: product.currentStock,
      status: product.status
    });
  };

  const handleEditChange = (e) => {
      setEditData({
        ...editData,
        [e.target.name]: e.target.value
      });
  };

  const handleSave = () => {
  setProducts(
    products.map((product) =>
      product._id === editingProduct._id
        ? {
            ...product,
            productName: editData.productName,
            sku: editData.sku,
            category: editData.category,
            wholesalePrice: Number(editData.wholesalePrice),
            currentStock: Number(editData.currentStock),
            status: editData.status
          }
        : product
    )
  );

  setEditingProduct(null);
};

  const handleDelete = (productId) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this product?'
  );

    if (confirmDelete) {
      setProducts(
        products.filter(
          (product) => product._id !== productId
        )
      );
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
        
      </div>

      <div className="manager-table-container">

        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <button 
            className="btn-action" 
            onClick={() => setShowAddProduct(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '20px 0 18px 0'}}
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>

        <table className="manager-table">
          <thead>
            <tr>
              <th>PRODUCT NAME</th>
              <th>SKU</th>
              <th>CATEGORY</th>
              <th>WHOLESALE PRICE</th>
              <th>CURRENT STOCK</th>
              <th>STATUS</th>
              <th className="action-column">EDIT</th>
              <th className="action-column">DELETE</th>
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

                  <td className="action-column">
                    <button
                      onClick={() => handleEdit(item)}
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
                      title="Edit Product"
                    >
                      <Pencil size={16} />
                    </button>
                  </td>
                  <td className="action-column">
                    <button
                      onClick={() => handleDelete(item._id)}
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
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#64748B' }}>
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
      
      
      {editingProduct && (
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
          Edit Product
        </h2>

        <button
          onClick={() => setEditingProduct(null)}
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={22} />
        </button>

      </div>


      {/* Product Name */}

      <div style={{ marginBottom: '15px' }}>

        <label>
          Product Name
        </label>

        <input
          type="text"
          name="productName"
          value={editData.productName}
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


      {/* SKU */}

      <div style={{ marginBottom: '15px' }}>

        <label>
          SKU
        </label>

        <input
          type="text"
          name="sku"
          value={editData.sku}
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


      {/* Category */}

      <div style={{ marginBottom: '15px' }}>

        <label>
          Category
        </label>

        <input
          type="text"
          name="category"
          value={editData.category}
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


      {/* Wholesale Price */}

      <div style={{ marginBottom: '15px' }}>

        <label>
          Wholesale Price
        </label>

        <input
          type="number"
          name="wholesalePrice"
          value={editData.wholesalePrice}
          onChange={handleEditChange}
          min="0"
          step="0.01"
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


      {/* Current Stock */}

      <div style={{ marginBottom: '15px' }}>

        <label>
          Current Stock
        </label>

        <input
          type="number"
          name="currentStock"
          value={editData.currentStock}
          onChange={handleEditChange}
          min="0"
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

          <option value="In Stock">
            In Stock
          </option>

          <option value="Low Stock">
            Low Stock
          </option>

          <option value="Out of Stock">
            Out of Stock
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
          onClick={() => setEditingProduct(null)}
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