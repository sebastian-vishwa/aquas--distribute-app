import React, { useState } from 'react';

export default function AddDriver({ onClose, refreshDrivers }) {
  const [formData, setFormData] = useState({
    fullName: '', driverId: '', email: '', phone: '', address: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/drivers/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Driver Added!');
        refreshDrivers();
        onClose();
      } else {
        alert('Error adding driver.');
      }
    } catch (error) {
      console.error('Server error:', error);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0, color: '#1E3A8A' }}>Add Driver</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={inputGroupStyle}><label style={labelStyle}>Full Name *</label><input type="text" name="fullName" onChange={handleChange} required style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>Driver ID *</label><input type="text" name="driverId" onChange={handleChange} required style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>Email *</label><input type="email" name="email" onChange={handleChange} required style={inputStyle} /></div>
            <div style={inputGroupStyle}><label style={labelStyle}>Phone *</label><input type="tel" name="phone" onChange={handleChange} required style={inputStyle} /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={onClose} style={{ padding: '0.7rem 1.5rem', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ padding: '0.7rem 1.5rem', background: '#3B82F6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save Driver</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 };
const modalStyle = { backgroundColor: '#ffffff', padding: '2.5rem', borderRadius: '12px', width: '600px', maxWidth: '90%' };
const inputGroupStyle = { display: 'flex', flexDirection: 'column', gap: '0.4rem' };
const labelStyle = { fontSize: '0.85rem', fontWeight: '600' };
const inputStyle = { padding: '0.8rem', border: '1px solid #CBD5E1', borderRadius: '6px' };