import React, { useState, useEffect } from 'react';
import './portal.css';
import { 
  ShieldCheck, 
  Radio, 
  Building2, 
  Droplets, 
  TrendingUp, 
  Receipt, 
  Truck, 
  BarChart3, 
  Package, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DashboardRegCus() {
  // Step 1: Customer data state and live MongoDB fetch
  const [customerData, setCustomerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/customers');
        const data = await response.json();
        // Set the state to the first user in the returned array
        if (Array.isArray(data) && data.length > 0) {
          setCustomerData(data[0]);
        } else {
          setCustomerData(null);
        }
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
        setCustomerData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  // Bar chart data for Most Purchased Items (5 columns with Aquas blue shades)
  const barChartData = [
    { label: '5-Gal Jars', units: 145, percentage: 88, color: '#0A3D91' },
    { label: '19L Bottles', units: 112, percentage: 70, color: '#0284C7' },
    { label: '0.5L Cases', units: 84, percentage: 54, color: '#0EA5E9' },
    { label: '1.5L Cases', units: 58, percentage: 38, color: '#38BDF8' },
    { label: 'Dispenser Bases', units: 28, percentage: 22, color: '#7DD3FC' },
  ];

  return (
    <div className="portal-page">
      {/* ====================================================================
          Step 2: Top Hero Banner (Command Center Layout)
          ==================================================================== */}
      <div className="command-hero-banner">
        {/* Left Side */}
        <div className="hero-left-section">
          <div className="hero-badges-row">
            <span className="hero-pill-badge">
              <ShieldCheck size={15} color="#38BDF8" />
              Verified Wholesale Partner
            </span>
            <span className="hero-pill-badge">
              <span className="live-pulse-dot"></span>
              Live Dispatch Connected
            </span>
          </div>

          <h1 className="hero-title">
            Welcome back, {isLoading ? "Loading Partner Data..." : (customerData?.name || "Partner")}
          </h1>
          <p className="hero-subtitle">
            Enterprise Logistics Console • Real-time commercial delivery tracking, inventory allocation, and fulfillment schedule.
          </p>
        </div>

        {/* Right Side: Account Overview Translucent Card */}
        <div className="hero-right-card">
          <div className="overview-card-header">
            <h3>
              <Building2 size={16} />
              Account Overview
            </h3>
            <span className="overview-card-tag">Tier 1 Wholesale</span>
          </div>

          <div className="overview-details-grid">
            <div className="overview-row">
              <span className="overview-label">Company Name:</span>
              <span className="overview-value">
                {isLoading ? "Loading Partner Data..." : (customerData?.name || "Apex Traders LLC")}
              </span>
            </div>

            <div className="overview-row">
              <span className="overview-label">Contact:</span>
              <span className="overview-value">
                {isLoading ? "Loading..." : (customerData?.email || "procurement@apextraders.com")}
              </span>
            </div>

            <div className="overview-row">
              <span className="overview-label">Payment Terms:</span>
              <span className="overview-value badge-value">Net-30 Active</span>
            </div>

            <div className="overview-row">
              <span className="overview-label">Dispatch Dock:</span>
              <span className="overview-value">Dock 4B - Central Hub</span>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Step 3: KPI Metrics Row (4 Cards)
          ==================================================================== */}
      <div className="portal-grid">
        {/* Card 1: Subscription */}
        <div className="portal-card">
          <div className="kpi-top-row">
            <p className="kpi-title">Subscription</p>
            <div className="kpi-icon-wrap">
              <Droplets size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">20 Jugs</h2>
          </div>
          <div className="kpi-footer">
            <span className="kpi-subtext">Weekly Delivery</span>
            <span style={{ fontSize: '0.8rem', color: '#0EA5E9', fontWeight: 600 }}>Active</span>
          </div>
        </div>

        {/* Card 2: Savings YTD */}
        <div className="portal-card">
          <div className="kpi-top-row">
            <p className="kpi-title">Savings YTD</p>
            <div className="kpi-icon-wrap" style={{ color: '#0284C7', background: '#F0F9FF' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value" style={{ color: '#0A3D91' }}>Rs. 375,500.00</h2>
            <span className="kpi-badge-blue">+18%</span>
          </div>
          <div className="kpi-footer">
            <span className="kpi-subtext">vs retail benchmark</span>
            <span style={{ fontSize: '0.8rem', color: '#64748B' }}>YTD 2026</span>
          </div>
        </div>

        {/* Card 3: Outstanding */}
        <div className="portal-card">
          <div className="kpi-top-row">
            <p className="kpi-title">Outstanding</p>
            <div className="kpi-icon-wrap" style={{ color: '#D97706', background: '#FFFBEB' }}>
              <Receipt size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">Rs. 144,000.00</h2>
          </div>
          <div className="kpi-footer">
            <span className="kpi-due-badge">Due in 12d</span>
            <span className="kpi-subtext" style={{ fontSize: '0.8rem' }}>Invoice #AQ-8891</span>
          </div>
        </div>

        {/* Card 4: Next Delivery */}
        <div className="portal-card">
          <div className="kpi-top-row">
            <p className="kpi-title">Next Delivery</p>
            <div className="kpi-icon-wrap" style={{ color: '#059669', background: '#ECFDF5' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <h2 className="kpi-value">10:30 AM</h2>
          </div>
          <div className="kpi-footer">
            <span className="en-route-indicator">
              <span className="en-route-pulse"></span>
              En Route
            </span>
            <span className="kpi-subtext" style={{ fontSize: '0.8rem' }}>Truck #04</span>
          </div>
        </div>
      </div>

      {/* ====================================================================
          Step 4: Bottom Analytics Section (2fr 1fr Grid)
          ==================================================================== */}
      <div className="analytics-section-grid">
        {/* Left Column: Most Purchased Items (CSS-based Bar Chart) */}
        <div className="analytics-card-white">
          <div className="analytics-card-header">
            <div>
              <h3 className="analytics-card-title">
                <BarChart3 size={20} color="#0A3D91" />
                Most Purchased Items
              </h3>
              <p className="analytics-card-subtitle">
                Commercial unit distribution and reorder volume over current billing cycle
              </p>
            </div>
            <span className="analytics-filter-tag">Last 30 Days</span>
          </div>

          <div className="barchart-container">
            {/* Bars plot area */}
            <div className="barchart-plot-area">
              {barChartData.map((item, index) => (
                <div key={index} className="barchart-column">
                  <div className="barchart-bar-wrapper">
                    <span className="barchart-value-label">{item.units}</span>
                    <div 
                      className="barchart-bar" 
                      style={{ 
                        height: `${item.percentage * 1.7}px`, 
                        backgroundColor: item.color 
                      }}
                      title={`${item.label}: ${item.units} units`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Labels under each bar */}
            <div className="barchart-labels-row">
              {barChartData.map((item, index) => (
                <div key={index} className="barchart-label-item">
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Monthly Total Volume Summary Card */}
        <div className="analytics-card-blue">
          <div>
            <span className="volume-stat-badge">
              <Package size={14} />
              Monthly Aggregation
            </span>
            <h3 style={{ margin: '0.4rem 0 0 0', fontSize: '1.15rem', color: '#1E3A8A', fontWeight: 700 }}>
              Monthly Total Volume
            </h3>
            
            <h2 className="volume-large-stat">380 Units Ordered</h2>
            <p className="volume-stat-caption">
              Total commercial units dispatched across regular routes and supplemental orders.
            </p>

            <div className="volume-details-list">
              <div className="volume-detail-item">
                <span className="volume-detail-label">Top Category</span>
                <span className="volume-detail-value highlight">5-Gal Commercial Jars</span>
              </div>
              <div className="volume-detail-item">
                <span className="volume-detail-label">Tier Discount</span>
                <span className="volume-detail-value" style={{ color: '#0284C7' }}>Wholesale Tier 2 (-15%)</span>
              </div>
              <div className="volume-detail-item">
                <span className="volume-detail-label">Fulfillment Status</span>
                <span className="volume-detail-value" style={{ color: '#059669' }}>100% On Schedule</span>
              </div>
              <div className="volume-detail-item">
                <span className="volume-detail-label">Next Recurring Batch</span>
                <span className="volume-detail-value">Friday, 8:00 AM</span>
              </div>
            </div>
          </div>

          <button className="volume-quick-action" onClick={() => window.location.href = '/portal/orders'}>
            <Sparkles size={16} />
            View Complete Order History
          </button>
        </div>
      </div>
    </div>
  );
}