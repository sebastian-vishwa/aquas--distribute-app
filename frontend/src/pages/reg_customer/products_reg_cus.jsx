import React from 'react';
import { Droplets, Package, Flame, Boxes, PlusCircle } from 'lucide-react';

export default function ProductsRegCus() {
  const products = [
    { 
      name: 'Premium 5-Gallon Dispenser Jar', 
      price: '$5.50 / unit', 
      icon: <Droplets size={44} color="#0EA5E9" strokeWidth={1.75} />,
      bg: '#E0F2FE'
    },
    { 
      name: 'Pure Mineral 1L Case (24 Pk)', 
      price: '$12.00 / case', 
      icon: <Package size={44} color="#3B82F6" strokeWidth={1.75} />,
      bg: '#DBEAFE'
    },
    { 
      name: 'Industrial Hot/Cold Dispenser', 
      price: '$185.00 / unit', 
      icon: <Flame size={44} color="#F59E0B" strokeWidth={1.75} />,
      bg: '#FEF3C7'
    },
    { 
      name: 'Pallet: 5-Gallon Jars (40 Units)', 
      price: '$200.00 / pallet', 
      icon: <Boxes size={44} color="#0A3D91" strokeWidth={1.75} />,
      bg: '#E2E8F0'
    },
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
          <div 
            key={i} 
            className="portal-card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center', 
              padding: '2rem 1.5rem' 
            }}
          >
            {/* Product Icon Box */}
            <div 
              style={{ 
                background: p.bg, 
                width: '80px', 
                height: '80px', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '1.25rem' 
              }}
            >
              {p.icon}
            </div>

            <h3 style={{ fontSize: '1.05rem', color: '#1E293B', marginBottom: '0.5rem', minHeight: '2.5rem' }}>
              {p.name}
            </h3>
            
            <p style={{ color: '#0EA5E9', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
              {p.price}
            </p>
            
            <button 
              style={{ 
                marginTop: 'auto', 
                width: '100%',
                background: '#1E3A8A', 
                color: 'white', 
                border: 'none', 
                padding: '0.8rem', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <PlusCircle size={16} /> Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}