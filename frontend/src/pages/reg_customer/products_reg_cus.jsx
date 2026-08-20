import React from 'react';

export default function ProductsRegCus() {
  const products = [
    { name: 'Premium 5-Gallon Dispenser Jar', price: '$5.50 / unit', img: '💧' },
    { name: 'Pure Mineral 1L Case (24 Pk)', price: '$12.00 / case', img: '📦' },
    { name: 'Industrial Hot/Cold Dispenser', price: '$185.00 / unit', img: '🚰' },
    { name: 'Pallet: 5-Gallon Jars (40 Units)', price: '$200.00 / pallet', img: '🏗️' },
  ];

  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Wholesale Catalogue</h1>
          <p className="portal-subtitle">Order inventory at your partnered corporate rates.</p>
        </div>
      </div>

      <div className="portal-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {products.map((p, i) => (
          <div key={i} className="portal-card" style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{p.img}</div>
            <h3 style={{ fontSize: '1.1rem', color: '#1E293B', marginBottom: '0.5rem' }}>{p.name}</h3>
            <p style={{ color: '#0EA5E9', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{p.price}</p>
            <button style={{ marginTop: 'auto', background: '#1E3A8A', color: 'white', border: 'none', padding: '0.8rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}