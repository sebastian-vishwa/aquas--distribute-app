import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function NavbarRegCus() {
  const navigate = useNavigate();

  return (
    <nav style={navStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h2 style={{ color: '#1E3A8A', margin: 0, cursor: 'pointer' }} onClick={() => navigate('/portal')}>
          💧 AquaPure <span style={{ fontSize: '0.8rem', color: '#0EA5E9' }}>PORTAL</span>
        </h2>
        
        {/* TRK Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', background: '#F1F5F9', padding: '0.4rem 1rem', borderRadius: '20px' }}>
          <span style={{ marginRight: '8px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search TRK ID..." 
            style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem' }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', fontWeight: '500' }}>
        <NavLink to="/portal" end style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/portal/products" style={linkStyle}>Shop Catalogue</NavLink>
        <NavLink to="/portal/orders" style={linkStyle}>My Orders</NavLink>
        <NavLink to="/portal/deliveries" style={linkStyle}>Deliveries</NavLink>
      </div>

      <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', fontSize: '1.2rem', cursor: 'pointer' }}>
        <span title="Notifications">🔔</span>
        <span title="Cart">🛒</span>
        <div 
          onClick={() => navigate('/login')} 
          style={{ width: '35px', height: '35px', background: '#1E3A8A', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 'bold' }}
          title="Sign Out"
        >
          JD
        </div>
      </div>
    </nav>
  );
}

const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 5%', background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0, zIndex: 100 };
const linkStyle = ({ isActive }) => ({ textDecoration: 'none', color: isActive ? '#0EA5E9' : '#64748B', borderBottom: isActive ? '2px solid #0EA5E9' : 'none', paddingBottom: '4px' });