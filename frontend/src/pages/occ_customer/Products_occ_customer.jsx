import React, { useState, useEffect } from 'react';

export default function ProductsOccCustomer() {
  const [catalogueData, setCatalogueData] = useState([]);

  // Fetch live products from your Express backend
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

  return (
    <div style={{ padding: '2rem 5%', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      
      {/* Hero Banner Section */}
      <div style={{ backgroundColor: '#0A3D91', color: 'white', padding: '4rem', borderRadius: '12px', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#93C5FD', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Wholesale Bundles
          </p>
          <h1 style={{ fontSize: '2.8rem', margin: '1rem 0', lineHeight: '1.2' }}>
            Bulk Hydration Solutions For Your Business
          </h1>
          <p style={{ lineHeight: '1.6', color: '#E0F2FE', fontSize: '1.05rem', maxWidth: '500px' }}>
            Streamline your supply chain with our high-volume water bundles. Designed for corporate offices, retail distributors, and industrial facilities.
          </p>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px dashed rgba(255,255,255,0.2)', borderRadius: '12px', minHeight: '250px' }}>
           <p style={{ color: '#93C5FD', fontSize: '0.9rem' }}>Pallet Image Here</p>
        </div>
      </div>

      {/* Dynamic Products Grid */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#1E293B', fontSize: '1.5rem' }}>Available Bundles</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span style={{ padding: '4px', cursor: 'pointer' }}>▤</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {catalogueData.length > 0 ? (
          catalogueData.map((item) => (
            <div key={item._id} style={{ backgroundColor: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Product Image Placeholder */}
              <div style={{ backgroundColor: '#F1F5F9', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#94A3B8', fontSize: '0.9rem' }}>{item.productName} Image</span>
              </div>
              
              {/* Product Details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#1E293B', margin: 0, fontWeight: '700' }}>
                    {item.productName}
                  </h3>
                  <span style={{ backgroundColor: '#E0F2FE', color: '#0284C7', padding: '3px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {item.category}
                  </span>
                </div>
                
                <p style={{ color: '#0EA5E9', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                  ${item.wholesalePrice ? item.wholesalePrice.toFixed(2) : '0.00'} 
                  <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 'normal' }}> / {item.unit ? item.unit.toLowerCase() : 'unit'}</span>
                </p>
                
                <button style={{ marginTop: 'auto', width: '100%', padding: '0.8rem', border: '2px solid #0A3D91', color: '#0A3D91', backgroundColor: 'transparent', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: '#64748B', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            No bundles available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}