import React from 'react';
import './manager_pages.css';

export default function FleetManagement() {
  const fleetData = [
    { id: 'T-089', status: 'In Transit', sClass: 'status-active', driver: 'John Doe', loc: 'I-95 Northbound -> Depot B' },
    { id: 'T-142', status: 'Maintenance', sClass: 'status-inactive', driver: 'Unassigned', loc: 'Garage A, Bay 4' },
    { id: 'T-201', status: 'In Transit', sClass: 'status-active', driver: 'Sarah Jenkins', loc: 'Route 44 -> Retailer Hub C' }
  ];

  return (
    <div>
      <div className="manager-header">
        <h1>Fleet Management</h1>
        <button className="btn-action" onClick={() => alert('Add Vehicle Modal')}>+ Add Vehicle</button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Fleet</div><div className="stat-value">124</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#3B82F6'}}>In Transit</div><div className="stat-value">87</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#64748B'}}>Idle</div><div className="stat-value">22</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#DC2626'}}>Maintenance</div><div className="stat-value">15</div></div>
      </div>

      <div className="manager-table-container">
        <h3 style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          Vehicle Status Roster
          <button style={{ background: 'none', border: 'none', color: '#0A5C99', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => alert('Downloading CSV...')}>Export CSV 📥</button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr><th>VEHICLE ID</th><th>STATUS</th><th>DRIVER</th><th>LOCATION / DESTINATION</th></tr>
          </thead>
          <tbody>
            {fleetData.map((v, i) => (
              <tr key={i}>
                <td><strong>{v.id}</strong></td>
                <td><span className={`status-pill ${v.sClass}`}>{v.status}</span></td>
                <td>{v.driver}</td>
                <td>{v.loc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}