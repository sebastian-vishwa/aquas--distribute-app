import React, { useState } from "react";
import "./AddProduct.css";

export default function AddProduct({ onClose, onAdd }) {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    wholesalePrice: "",
    currentStock: "",
    reorderLevel: "",
    unit: "",
    description: "",
    status: "In Stock",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation check
    if (
      !product.name ||
      !product.sku ||
      !product.category ||
      !product.wholesalePrice ||
      !product.currentStock
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      // 2. Send the data to your Express backend
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          productName: product.name // Maps the frontend 'name' to the backend 'productName'
        }), 
      });

      // 3. Handle success or failure
      if (response.ok) {
        alert('✅ Product added successfully!');
        if (onAdd) onAdd(); // Triggers the parent page to refresh the table
        onClose(); // Closes the modal
      } else {
        const errData = await response.json();
        alert(`❌ Error adding product: ${errData.message}`);
      }
    } catch (error) {
      console.error('Server error:', error);
      alert('Server error. Make sure your backend terminal is running!');
    }
  };

  return (
    <div className="product-modal-overlay">

      <div className="product-modal">

        {/* Header */}
        <div className="product-modal-header">

          <div>
            <h2>Add New Product</h2>

            <p>
              Basic information for product registration.
            </p>
          </div>

          <button
            type="button"
            className="product-close-btn"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="product-form-body">

            <h3>Product Information</h3>

            <div className="product-form-grid">

              {/* Product Name */}
              <div className="product-form-group full-width">

                <label>
                  Product Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. 5-Gallon Dispenser Jar"
                  value={product.name}
                  onChange={handleChange}
                />

              </div>

              {/* SKU */}
              <div className="product-form-group">

                <label>
                  Stock Keeping Unit <span>*</span>
                </label>

                <input
                  type="text"
                  name="sku"
                  placeholder="e.g. AQ-5G-PRM"
                  value={product.sku}
                  onChange={handleChange}
                />

              </div>

              {/* Category */}
              <div className="product-form-group">

                <label>
                  Category <span>*</span>
                </label>

                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="5-Gallon">
                    5-Gallon
                  </option>

                  <option value="1L Bottles">
                    1L Bottles
                  </option>

                  <option value="Dispensers">
                    Dispensers
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

              </div>

              {/* Wholesale Price */}
              <div className="product-form-group">

                <label>
                  Wholesale Price <span>*</span>
                </label>

                <input
                  type="number"
                  name="wholesalePrice"
                  placeholder="e.g. 5.50"
                  min="0"
                  step="0.01"
                  value={product.wholesalePrice}
                  onChange={handleChange}
                />

              </div>

              {/* Current Stock */}
              <div className="product-form-group">

                <label>
                  Current Stock <span>*</span>
                </label>

                <input
                  type="number"
                  name="currentStock"
                  placeholder="e.g. 100"
                  min="0"
                  value={product.currentStock}
                  onChange={handleChange}
                />

              </div>

              {/* Reorder Level */}
              <div className="product-form-group">

                <label>
                  Reorder Level
                </label>

                <input
                  type="number"
                  name="reorderLevel"
                  placeholder="e.g. 50"
                  min="0"
                  value={product.reorderLevel}
                  onChange={handleChange}
                />

              </div>

              {/* Unit */}
              <div className="product-form-group">

                <label>
                  Unit
                </label>

                <select
                  name="unit"
                  value={product.unit}
                  onChange={handleChange}
                >

                  <option value="">
                    Select unit
                  </option>

                  <option value="Piece">
                    Piece
                  </option>

                  <option value="Case">
                    Case
                  </option>

                  <option value="Bottle">
                    Bottle
                  </option>

                  <option value="Litre">
                    Litre
                  </option>

                </select>

              </div>

              {/* Status */}
              <div className="product-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={product.status}
                  onChange={handleChange}
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

              {/* Description */}
              <div className="product-form-group full-width">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  placeholder="Enter product description..."
                  value={product.description}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="product-modal-footer">

            <button
              type="button"
              className="product-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="product-save-btn"
            >
              + Add Product
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}