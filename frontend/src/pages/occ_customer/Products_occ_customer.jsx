import React, { useState } from 'react';
import './Products_occ_customer.css';
import { useCart } from '../../components/common/CartContext';

export default function Products() {
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();
  
  // Modal eka wenuwen aluth states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Add to cart click karama modal eka open wena function eka
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1); // Modal open weddi hama tissema 1n patan ganna
  };

  // Modal eke confirm karama cart ekata add wena function eka
  const handleConfirmAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      setSelectedProduct(null); // Modal eka close karanawa
    }
  };

  return (
    <div className="products-wrapper">
      
      {/* MODAL POPUP EKA */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{selectedProduct.title}</h3>
            <p className="modal-desc">Select quantity to add to your cart</p>
            
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
                className="qty-btn"
              >-</button>
              <span className="qty-display">{quantity}</span>
              <button 
                onClick={() => setQuantity(prev => prev + 1)}
                className="qty-btn"
              >+</button>
            </div>
            
            {/* Dynamic Price Calculation */}
            <div className="modal-total">
              Total Price: <span>Rs. {selectedProduct.price * quantity}</span>
            </div>

            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setSelectedProduct(null)}>Cancel</button>
              <button className="btn-confirm" onClick={handleConfirmAddToCart}>Confirm Add</button>
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

      {/* BUNDLES GRID */}
      <section className="bundles-section">
        <div className="section-header">
          <h2>Available Bundles</h2>
          <div className="view-toggles">
            <button className={`icon-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
            <button className={`icon-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>≣</button>
          </div>
        </div>

        <div className={`bundles-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
          {/* Card 1 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">5-Gallon Jar Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>5-Gallon Jar</h3>
                <span className="badge">BUNDLE OF 5</span>
              </div>
              <p>Standard size for office water dispensers.</p>
              <div className="price-row">
                <h2>Rs. 3750</h2>
              </div>
              {/* Button eka change kala handleOpenModal walata */}
              <button className="btn-cart" onClick={() => handleOpenModal({ id: 1, title: '5-Gallon Jar', price: 3750 })}>🛒 Add to Cart</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bundle-card best-seller">
            <span className="best-seller-tag">BEST SELLER</span>
            <div className="card-img-placeholder">19L Bottle Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>19L Bottle</h3>
                <span className="badge">BUNDLE OF 3</span>
              </div>
              <p>Premium mineral water enriched with essential electrolytes.</p>
              <div className="price-row">
                <h2>Rs. 2400</h2>
              </div>
              <button className="btn-cart" onClick={() => handleOpenModal({ id: 2, title: '19L Bottle', price: 2400 })}>🛒 Add to Cart</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">0.5L Small Bottles Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>0.5L Small Bottles</h3>
                <span className="badge outline">CASE OF 24</span>
              </div>
              <p>Perfect for retail resale or large corporate events.</p>
              <div className="price-row">
                <h2>Rs. 1950</h2>
              </div>
              <button className="btn-cart" onClick={() => handleOpenModal({ id: 3, title: '0.5L Small Bottles', price: 1950 })}>🛒 Add to Cart</button>
            </div>
          </div> 

          {/* Card 4 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">1.5L Bottles Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>1.5L Bottles</h3>
                <span className="badge outline">CASE OF 12</span>
              </div>
              <p>Ideal for daily hydration needs. BPA-free packaging.</p>
              <div className="price-row">
                <h2>Rs. 1850</h2>
              </div>
              <button className="btn-cart" onClick={() => handleOpenModal({ id: 4, title: '1.5L Bottles', price: 1850 })}>🛒 Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}