import React, { useState, useEffect } from 'react';
import './manager_pages.css';
import { Pencil, Trash2 } from 'lucide-react';
import AddVehicle from "../../components/manager/Addvehicle"; 
import AddDriver from "../../components/manager/AddDriver"; 

export default function FleetManagement() {
  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [isDriverModalOpen, setDriverModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editingVehicle, setEditingVehicle] = useState(null);
  
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

  // 3. Delete Driver safely
  const handleDeleteDriver = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this driver?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/drivers/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Driver deleted successfully!');
        fetchDrivers();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete driver');
      }
    } catch (error) {
      console.error('Error deleting driver:', error);
      alert('Error deleting driver. Please try again.');
    }
  };

  // 4. Delete Vehicle safely
  const handleDeleteVehicle = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vehicle?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/vehicles/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Vehicle deleted successfully!');
        fetchVehicles();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('Error deleting vehicle. Please try again.');
    }
  };

  // Load data when page opens
  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  const totalFleet = vehicleData.length;
  const inTransitCount = vehicleData.filter(v => v.status === 'In Transit').length;
  const idleCount = vehicleData.filter(v => v.status === 'Idle').length;
  const maintenanceCount = vehicleData.filter(v => v.status === 'Maintenance').length;

  return (
    <div>
      <div className="manager-header">
        <h1>Fleet Management</h1>
      </div>

      <div className="manager-stats-grid">
        <div className="stat-card"><div className="stat-title">Total Fleet</div><div className="stat-value">{totalFleet}</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#3B82F6'}}>In Transit</div><div className="stat-value">{inTransitCount}</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#64748B'}}>Idle</div><div className="stat-value">{idleCount}</div></div>
        <div className="stat-card"><div className="stat-title" style={{color: '#DC2626'}}>Maintenance</div><div className="stat-value">{maintenanceCount}</div></div>
      </div>

      {/* Vehicle Status Roster (Now mapped to MongoDB!) */}
      <div className="manager-table-container" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Vehicle Status Roster
          <button className="btn-action" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} onClick={() => { setEditingVehicle(null); setVehicleModalOpen(true); }}>
            + Add Vehicle
          </button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr>
              <th>VEHICLE ID</th>
              <th>STATUS</th>
              <th>DRIVER</th>
              <th>LOCATION / DESTINATION</th>
              <th style={{ textAlign: 'center', width: '120px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {vehicleData.length > 0 ? (
              vehicleData.map((v, i) => (
                <tr key={v._id || i}>
                  <td><strong>{v.vehicleId}</strong></td>
                  <td>
                    <span className={`status-pill ${v.status === 'In Transit' ? 'status-active' : v.status === 'Maintenance' ? 'status-inactive' : 'status-pending'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>{v.driver}</td>
                  <td>{v.location}</td>
                  <td style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                      <button
                        onClick={() => { setEditingVehicle(v); setVehicleModalOpen(true); }}
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Edit Vehicle"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(v._id)}
                        style={{
                          border: 'none',
                          background: 'none',
                          cursor: 'pointer',
                          color: '#DC2626',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="Delete Vehicle"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No vehicles in database. Add one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Driver Roster Table (Now mapped to MongoDB!) */}
      <div className="manager-table-container">
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Driver Roster
          <button className="btn-action" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }} onClick={() => { setEditingDriver(null); setDriverModalOpen(true); }}>
            + Add Driver
          </button>
        </h3>
        <table className="manager-table">
          <thead>
            <tr>
              <th>DRIVER ID</th>
              <th>NAME</th>
              <th>STATUS</th>
              <th>ASSIGNED VEHICLE</th>
              <th style={{ textAlign: 'center', width: '120px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {driverData.length > 0 ? (
              driverData.map((d, i) => {
                const linkedVehicle = vehicleData.find(v => v.driver === d.fullName);
                return (
                  <tr key={d._id || i}>
                    <td style={{ color: '#0A5C99', fontWeight: '600' }}>{d.driverId}</td>
                    <td>{d.fullName}</td>
                    <td>
                      <span className={`status-pill ${d.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                        {d.status}
                      </span>
                    </td>
                    <td><strong>{linkedVehicle ? linkedVehicle.vehicleId : 'Unassigned'}</strong></td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button
                          onClick={() => { setEditingDriver(d); setDriverModalOpen(true); }}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Edit Driver"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteDriver(d._id)}
                          style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            color: '#DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Delete Driver"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>No drivers in database. Add one!</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {isVehicleModalOpen && (
        <AddVehicle 
          onClose={() => { setVehicleModalOpen(false); setEditingVehicle(null); }} 
          refreshVehicles={fetchVehicles} 
          editData={editingVehicle}
        />
      )}
      {isDriverModalOpen && (
        <AddDriver 
          onClose={() => { setDriverModalOpen(false); setEditingDriver(null); }} 
          refreshDrivers={fetchDrivers} 
          editData={editingDriver}
        />
      )}
    </div>
  );
}