import React, { useState, useEffect } from 'react';
import { useRegCart } from '../../context/RegCartContext';
import { Plus, Minus, X, Check, ShoppingCart } from 'lucide-react';
import "./products_reg_cus.css";

export default function Catalogue() {
  const { addToCart } = useRegCart();
  const [catalogueData, setCatalogueData] = useState([]);
  
  // Modal Control States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
      addToCart(selectedProduct, quantity);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="portal-page">

      {/* QUANTITY POPUP MODAL OVER DARK BLUE BACKDROP */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedProduct.productName}</h3>
            <p className="modal-desc">Select quantity for wholesale order</p>

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
              Subtotal: <span>Rs. {((selectedProduct.wholesalePrice || selectedProduct.price || 0) * quantity).toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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

      <div className="portal-header">
        <div>
          <h1 className="portal-title">Wholesale Catalogue</h1>
          <p className="portal-subtitle">Bulk pricing and exclusive rates for registered commercial accounts</p>
        </div>
      </div>

      <div className="portal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {catalogueData.length > 0 ? (
          catalogueData.map((item) => (
            <div key={item._id} className="portal-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              {item.image ? (
                <img src={item.image} alt={item.productName} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem' }} />
              ) : (
                <div style={{ width: '100%', height: '180px', backgroundColor: '#e2e8f0', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                  No Image
                </div>
              )}
              <h3 style={{ fontSize: '1.1rem', color: '#1E293B', marginBottom: '0.5rem', minHeight: '40px' }}>
                {item.productName} 
              </h3>
              
              <p style={{ color: '#0EA5E9', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                Rs. {item.wholesalePrice ? item.wholesalePrice.toLocaleString('en-LK', { minimumFractionDigits: 2 }) : '0.00'} / {item.unit ? item.unit.toLowerCase() : 'unit'}
              </p>
              
              <button
                type="button"
                onClick={() => handleOpenModal(item)}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '0.75rem',
                  background: '#1E3A8A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s'
                }}
              >
                <ShoppingCart size={18} /> Add to Order
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: 'span 4', textAlign: 'center', padding: '2rem', color: '#64748B' }}>
            No products available in the catalogue.
          </p>
        )}
      </div>
    </div>
  );
}