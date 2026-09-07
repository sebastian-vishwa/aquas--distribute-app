import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../components/common/CartContext';
import "./products_reg_cus.css";

export default function Catalogue() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [catalogueData, setCatalogueData] = useState([]);
  const [addingId, setAddingId] = useState(null);

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

  const handleAddToCart = async (item) => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    setAddingId(item._id);
    try {
      await addToCart(item);
    } finally {
      setAddingId(null);
    }
  };

  return (
    // 1. Replaced "catalogue-page" with "portal-page" for correct margins/width
    <div className="portal-page">
      

      <div className="portal-header">
        <div>
          <h1 className="portal-title">Wholesale Catalogue</h1>
          
        </div>
      </div>


      <div className="portal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        
        {catalogueData.length > 0 ? (
          catalogueData.map((item) => (
            // 4. Replaced inline card styles with "portal-card"
            <div key={item._id} className="portal-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              
              <h3 style={{ fontSize: '1.1rem', color: '#1E293B', marginBottom: '0.5rem', minHeight: '40px' }}>
                {item.productName} 
              </h3>
              
              <p style={{ color: '#0EA5E9', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                ${item.wholesalePrice ? item.wholesalePrice.toFixed(2) : '0.00'} / {item.unit ? item.unit.toLowerCase() : 'unit'}
              </p>
              
              <button
                onClick={() => handleAddToCart(item)}
                disabled={addingId === item._id}
                style={{
                  marginTop: 'auto',
                  width: '100%',
                  padding: '0.75rem',
                  background: addingId === item._id ? '#94a3b8' : '#1E3A8A',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: addingId === item._id ? 'default' : 'pointer',
                }}
              >
                {addingId === item._id ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: 'span 4', textAlign: 'center', padding: '2rem' }}>
            No products available in the catalogue.
          </p>
        )}
        
      </div>
    </div>
  );
}