import React, { useState, useEffect } from 'react';
import { useCart } from '../../components/common/CartContext';
import { ShoppingCart, LayoutGrid, List, Plus, Minus, X, Check } from 'lucide-react';
import './Products_occ_customer.css';
import heroImage from '../../assets/bottles_cat.png';

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
        id: selectedProduct._id || selectedProduct.id,
        name: selectedProduct.productName || selectedProduct.name,
        title: selectedProduct.productName || selectedProduct.name,
        price: selectedProduct.wholesalePrice || selectedProduct.price || 0,
        image: selectedProduct.imageUrl || selectedProduct.image || heroImage
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
      <header
        className="products-hero"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 75px)',
          backgroundColor: '#0A3D91',
          borderRadius: '0',
          padding: '0 8%',
          margin: 0,
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4rem',
          boxSizing: 'border-box'
        }}
      >
        <div className="hero-content" style={{ flex: 1, maxWidth: '550px' }}>
          <span
            className="subtitle"
            style={{
              color: '#93C5FD',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            WHOLESALE CATALOGUE
          </span>
          <h1 style={{ fontSize: '3rem', margin: '0.8rem 0', lineHeight: 1.2, fontWeight: 800, color: '#ffffff' }}>
            Pure Hydration at Commercial Rates.
          </h1>
          <p
            style={{
              color: '#E0F2FE',
              fontSize: '1.05rem',
              maxWidth: '520px',
              lineHeight: 1.6
            }}
          >
            Browse our complete lineup of multi-stage purified bottles, bulk pallets, and modern dispensers tailored for retail distributors and workplaces.
          </p>
        </div>
        <div
          className="hero-image"
          style={{
            flex: 1,
            height: '320px',
            minHeight: '280px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src={heroImage}
            alt="Wholesale Water Pallets"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>
      </header>

      {/* BUNDLES SECTION */}
      <section className="bundles-section" style={{ padding: '5rem 8%' }}>
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
                {item.image ? (
                  <img src={item.image} alt={item.productName} className="card-img-placeholder" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <div className="card-img-placeholder">{item.productName} Image</div>
                )}
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