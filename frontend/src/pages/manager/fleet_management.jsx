import React, { useState } from "react";
import { Plus, Download, Truck, Navigation, Wrench, Clock } from "lucide-react";
import './manager_pages.css';
import AddVehicle from "../../components/manager/Addvehicle";

export default function FleetManagement() {
  const initialFleetData = [
    { id: 'T-089', status: 'In Transit', sClass: 'status-active', driver: 'John Doe', loc: 'I-95 Northbound -> Depot B' },
    { id: 'T-142', status: 'Maintenance', sClass: 'status-inactive', driver: 'Unassigned', loc: 'Garage A, Bay 4' },
    { id: 'T-201', status: 'In Transit', sClass: 'status-active', driver: 'Sarah Jenkins', loc: 'Route 44 -> Retailer Hub C' }
  ];

  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [vehicles, setVehicles] = useState(initialFleetData);
  
  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Fleet Management</h1>
          <p>Track live routes, vehicle health, and driver assignments.</p>
        </div>
        <button 
          className="btn-action" 
          onClick={() => setShowAddVehicle(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Plus size={18} /> Add Vehicle
        </button>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Fleet
            <Truck size={18} color="#64748B" />
          </div>
          <div className="stat-value">124</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#3B82F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            In Transit
            <Navigation size={18} color="#3B82F6" />
          </div>
          <div className="stat-value">87</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#64748B', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Idle
            <Clock size={18} color="#64748B" />
          </div>
          <div className="stat-value">22</div>
        </div>

        <div className="stat-card">
          <div className="stat-title" style={{ color: '#DC2626', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Maintenance
            <Wrench size={18} color="#DC2626" />
          </div>
          <div className="stat-value">15</div>
        </div>
      </div>

      <div className="manager-table-container">
        <h3 style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Vehicle Status Roster
          <button 
            style={{ background: 'none', border: 'none', color: '#0A5C99', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }} 
            onClick={() => alert('Downloading CSV...')}
          >
            <Download size={16} /> Export CSV
          </button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr><th>VEHICLE ID</th><th>STATUS</th><th>DRIVER</th><th>LOCATION / DESTINATION</th></tr>
          </thead>
          <tbody>
            {vehicles.map((v, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Truck size={16} color="#0A5C99" />
                    <strong>{v.id}</strong>
                  </div>
                </td>
                <td><span className={`status-pill ${v.sClass}`}>{v.status}</span></td>
                <td>{v.driver}</td>
                <td>{v.loc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddVehicle && (
        <AddVehicle
          onClose={() => setShowAddVehicle(false)}
          onAdd={(newVehicle) => {
            setVehicles((previousVehicles) => [
              ...previousVehicles,
              newVehicle,
            ]);
            setShowAddVehicle(false);
          }}
        />
      )}
    </div>
  );
}