import React, { useState, useEffect } from 'react';
import './manager_pages.css';
import AddVehicle from "../../components/manager/Addvehicle"; 
import AddDriver from "../../components/manager/AddDriver"; 

export default function FleetManagement() {
  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [isDriverModalOpen, setDriverModalOpen] = useState(false);
  
  // State for database data
  const [driverData, setDriverData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]); 

  // 1. Fetch Drivers safely
  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/drivers');
      const data = await response.json();
      // Safety check: Ensure it's an array before saving to state
      setDriverData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch drivers:", error);
      setDriverData([]); // Fallback to empty array on crash
    }
  };

  // 2. Fetch Vehicles safely
  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/vehicles');
      const data = await response.json();
      setVehicleData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
      setVehicleData([]); 
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  return (
    <div>
      <div className="manager-header">
        <h1>Fleet Management</h1>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Fleet</div><div className="stat-value">{vehicleData.length}</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#3B82F6'}}>In Transit</div><div className="stat-value">0</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#64748B'}}>Idle</div><div className="stat-value">{vehicleData.length}</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#DC2626'}}>Maintenance</div><div className="stat-value">0</div></div>
      </div>

      {/* Vehicle Status Roster (Now mapped to MongoDB!) */}
      <div className="manager-table-container" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Vehicle Status Roster
          <button className="btn-action" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} onClick={() => setVehicleModalOpen(true)}>
            + Add Vehicle
          </button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr><th>VEHICLE ID</th><th>STATUS</th><th>DRIVER</th><th>LOCATION / DESTINATION</th></tr>
          </thead>
          <tbody>
            {vehicleData.length > 0 ? (
              vehicleData.map((v, i) => (
                <tr key={i}>
                  <td><strong>{v.vehicleId}</strong></td>
                  <td>
                    <span className={`status-pill ${v.status === 'In Transit' ? 'status-active' : v.status === 'Maintenance' ? 'status-inactive' : 'status-pending'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>{v.driver}</td>
                  <td>{v.location}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>No vehicles in database. Add one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Driver Roster Table (Now mapped to MongoDB!) */}
      <div className="manager-table-container">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Driver Roster
          <button className="btn-action" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} onClick={() => setDriverModalOpen(true)}>
            + Add Driver
          </button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr><th>DRIVER ID</th><th>NAME</th><th>STATUS</th><th>ASSIGNED VEHICLE</th></tr>
          </thead>
          <tbody>
            {driverData.length > 0 ? (
              driverData.map((d, i) => (
                <tr key={i}>
                  <td style={{ color: '#0A5C99', fontWeight: '600' }}>{d.driverId}</td>
                  <td>{d.fullName}</td>
                  <td>
                    <span className={`status-pill ${d.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td><strong>{d.assignedVehicle}</strong></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem'}}>No drivers in database. Add one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isVehicleModalOpen && <AddVehicle onClose={() => setVehicleModalOpen(false)} refreshVehicles={fetchVehicles} />}
      {isDriverModalOpen && <AddDriver onClose={() => setDriverModalOpen(false)} refreshDrivers={fetchDrivers} />}
    </div>
  );
}