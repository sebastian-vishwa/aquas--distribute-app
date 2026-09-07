import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/common/CartContext';
import { ShoppingCart, LayoutGrid, List, Plus, Minus, X, Check } from 'lucide-react';
import './Products_occ_customer.css';

export default function ProductsOccCustomer() {
  const [catalogueData, setCatalogueData] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  // Modal Control States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch live products from backend
  const fetchCatalogue = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setCatalogueData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch catalogue:", error);
    }
  };

  useEffect(() => {
    fetchCatalogue();
  }, []);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      const itemToAdd = {
        id: selectedProduct._id,
        title: selectedProduct.productName,
        price: selectedProduct.wholesalePrice || 0
      };
      addToCart(itemToAdd, quantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="products-wrapper">
      
      {/* QUANTITY POPUP MODAL */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedProduct.productName}</h3>
            <p className="modal-desc">Select quantity to add to your cart</p>
            
            <div className="quantity-controls">
              <button 
                type="button"
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                className="qty-btn"
              >
                <Minus size={18} />
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                type="button"
                onClick={() => setQuantity(prev => prev + 1)}
                className="qty-btn"
              >
                <Plus size={18} />
              </button>
            </div>
            
            <div className="modal-total">
              Total Price: <span>Rs. {((selectedProduct.wholesalePrice || 0) * quantity).toLocaleString()}</span>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-cancel" 
                onClick={() => setSelectedProduct(null)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <X size={16} /> Cancel
              </button>
              <button 
                type="button" 
                className="btn-confirm" 
                onClick={handleConfirmAddToCart}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Check size={16} /> Confirm Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <header className="products-hero">
        <div className="hero-content">
          <span className="subtitle">Wholesale Bundles</span>
          <h1>Bulk Hydration Solutions For Your Business</h1>
          <p>Streamline your supply chain with our high-volume water bundles. Designed for corporate offices, retail distributors, and industrial facilities.</p>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Pallet Image Here</div>
        </div>
      </header>

      {/* BUNDLES SECTION */}
      <section className="bundles-section">
        <div className="section-header">
          <h2>Available Bundles</h2>
          <div className="view-toggles">
            <button 
              type="button"
              className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`} 
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              type="button"
              className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`} 
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <div className={`bundles-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {catalogueData.length > 0 ? (
            catalogueData.map((item) => (
              <div key={item._id} className="bundle-card">
                <div className="card-img-placeholder">{item.productName} Image</div>
                <div className="card-content">
                  <div className="card-title-row">
                    <h3>{item.productName}</h3>
                    <span className="badge">{item.category || 'WHOLESALE'}</span>
                  </div>
                  <p>{item.description || 'Pure, high-quality filtered hydration solution.'}</p>
                  <div className="price-row">
                    <h2>Rs. {item.wholesalePrice ? item.wholesalePrice.toLocaleString() : '0'}</h2>
                  </div>
                  <button 
                    type="button"
                    className="btn-cart" 
                    onClick={() => handleOpenModal(item)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B' }}>
              No bundles available at the moment.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}