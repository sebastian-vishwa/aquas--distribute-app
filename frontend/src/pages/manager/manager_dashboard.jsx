import React, { useEffect, useRef } from 'react';
import { 
  DollarSign, 
  Truck, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Clock 
} from 'lucide-react';
import './manager_pages.css';

// Riders data with Sri Lanka coordinates
const RIDERS_DATA = [
  { id: 'TRK-104', name: 'J. Smith', location: 'Colombo', lat: 6.9271, lng: 79.8612, status: 'En Route', color: '#2563EB' },
  { id: 'TRK-299', name: 'A. Davis', location: 'Galle', lat: 6.0535, lng: 80.2210, status: 'Unloading', color: '#059669' },
  { id: 'TRK-305', name: 'K. Perera', location: 'Kandy', lat: 7.2906, lng: 80.6337, status: 'En Route', color: '#2563EB' },
  { id: 'TRK-412', name: 'S. Fernando', location: 'Negombo', lat: 7.2008, lng: 79.8737, status: 'Delayed', color: '#DC2626' },
  { id: 'TRK-501', name: 'M. Silva', location: 'Kurunegala', lat: 7.4863, lng: 80.3647, status: 'En Route', color: '#2563EB' },
];

const FleetMapOnly = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve();
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadStyle = (href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    loadStyle('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');

    loadScript('https://unpkg.com/leaflet@1.9.4/dist/leaflet.js').then(() => {
      if (mapRef.current && !mapInstance.current) {
        const L = window.L;

        // Initialize map centered in Sri Lanka
        const map = L.map(mapRef.current).setView([7.5, 80.5], 7.5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom Yellow Lorry SVG (matching your exact image style)
        const createYellowLorryIcon = () => {
          return L.divIcon({
            className: 'custom-yellow-truck',
            html: `
              <div style="
                filter: drop-shadow(0px 3px 5px rgba(0,0,0,0.3));
                cursor: pointer;
                transition: transform 0.2s ease;
              ">
                <svg width="45" height="35" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Container / Body (Yellow) */}
                  <rect x="8" y="8" width="70" height="52" rx="4" fill="#FFC700" stroke="#000000" stroke-width="6"/>
                  
                  {/* Cabin (Yellow) */}
                  <path d="M78 24 H92 C98 24 104 29 108 36 L114 47 C116 51 116 56 116 60 V60 H78 V24 Z" fill="#FFC700" stroke="#000000" stroke-width="6" stroke-linejoin="round"/>
                  
                  {/* Window (Cyan/Blue) */}
                  <path d="M88 30 H94 C97 30 100 33 103 38 L107 46 H88 V30 Z" fill="#38BDF8" stroke="#000000" stroke-width="4" stroke-linejoin="round"/>
                  
                  {/* Chassis Line */}
                  <line x1="8" y1="60" x2="116" y2="60" stroke="#000000" stroke-width="6"/>
                  
                  {/* Front Wheel */}
                  <circle cx="94" cy="68" r="12" fill="#FFC700" stroke="#000000" stroke-width="6"/>
                  <circle cx="94" cy="68" r="4" fill="#000000"/>
                  
                  {/* Back Wheel */}
                  <circle cx="30" cy="68" r="12" fill="#FFC700" stroke="#000000" stroke-width="6"/>
                  <circle cx="30" cy="68" r="4" fill="#000000"/>
                </svg>
              </div>
            `,
            iconSize: [45, 35],
            iconAnchor: [22, 17],
            popupAnchor: [0, -20]
          });
        };

        // Add 5 Riders to Map with Yellow Lorry Icon
        RIDERS_DATA.forEach(rider => {
          L.marker([rider.lat, rider.lng], { icon: createYellowLorryIcon() })
            .addTo(map)
            .bindPopup(`
              <div style="font-family: sans-serif; padding: 4px;">
                <b style="font-size: 14px; color: #1E293B;">🚚 ${rider.id}</b><br/>
                <span>Rider: <b>${rider.name}</b></span><br/>
                <span>Location: ${rider.location}</span><br/>
                <span style="color:${rider.color}; font-weight:bold; display:inline-block; margin-top:4px;">Status: ${rider.status}</span>
              </div>
            `);
        });

        mapInstance.current = map;
      }
    }).catch((err) => console.error("Error loading Leaflet script:", err));
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        height: '350px', 
        width: '100%', 
        borderRadius: '8px', 
        border: '1px solid #CBD5E1', 
        marginBottom: '1rem',
        zIndex: 1 
      }} 
    />
  );
};

export default function ManagerDashboard() {
  return (
    <div>
      <div className="manager-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Real-time logistics and inventory health monitoring.</p>
        </div>
      </div>

      <div className="manager-stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* Total Revenue */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Total Revenue 
            <span style={{ color: '#059669', display: 'flex', alignItems: 'center' }}>
              <DollarSign size={18} />
            </span>
          </div>
          <div className="stat-value">$1.24M</div>
          <p style={{ color: '#059669', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <TrendingUp size={14} /> +14.5% from last month
          </p>
        </div>

        {/* Active Deliveries */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Active Deliveries 
            <span style={{ color: '#3B82F6', display: 'flex', alignItems: 'center' }}>
              <Truck size={18} />
            </span>
          </div>
          <div className="stat-value">142</div>
          <p style={{ color: '#3B82F6', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
            <Clock size={14} /> 78% Complete
          </p>
        </div>

        {/* Inventory Health */}
        <div className="stat-card">
          <div className="stat-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Inventory Health 
            <span style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
              <Package size={18} />
            </span>
          </div>
          <div className="stat-value">94%</div>
          <p style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '4px' }}>
            2 Low Stock • 1 Restock Pending
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Fleet Tracking Map & Table */}
        <div className="manager-table-container" style={{ flex: 2 }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#0A3D91" /> Live Fleet Tracking
          </h3>

          {/* Render Fleet Map with Yellow Lorry Icon */}
          <FleetMapOnly />

          <table className="manager-table">
            <thead>
              <tr><th>DRIVER ID</th><th>STATUS</th><th>ETA</th></tr>
            </thead>
            <tbody>
              <tr><td>TRK-104 (J. Smith)</td><td><span className="status-pill status-active">En Route</span></td><td>14 mins</td></tr>
              <tr><td>TRK-299 (A. Davis)</td><td><span className="status-pill status-active">Unloading</span></td><td>Arrived</td></tr>
            </tbody>
          </table>
        </div>
        
        {/* Urgent Alerts */}
        <div className="manager-table-container" style={{ flex: 1, borderTop: '4px solid #DC2626' }}>
          <h3 style={{ color: '#DC2626', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#DC2626" /> Urgent Alerts
          </h3>
          <div style={{ padding: '1rem', background: '#FEF2F2', borderRadius: '6px', marginBottom: '1rem', cursor: 'pointer', border: '1px solid #FECACA' }} onClick={() => alert('Opening inventory...')}>
            <strong style={{ color: '#991B1B' }}>Critical Low Stock: 5G Jugs</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#7F1D1D' }}>Warehouse A inventory below 5%. Replenishment required.</p>
          </div>
          <div style={{ padding: '1rem', background: '#F0F9FF', borderRadius: '6px', cursor: 'pointer', border: '1px solid #BAE6FD' }} onClick={() => alert('Messaging driver...')}>
            <strong style={{ color: '#0369A1' }}>Delayed Delivery: Route 4B</strong>
            <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: '#075985' }}>TRK-088 reporting heavy traffic. Estimated delay: 45 mins.</p>
          </div>
        </div>
      </div>
    </div>
  );
}