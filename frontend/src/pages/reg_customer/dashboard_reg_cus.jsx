import React from 'react';
import { ShoppingCart, RefreshCw, TrendingUp, Building2, ChevronRight } from 'lucide-react';

export default function DashboardRegCus() {
  return (
    <div className="portal-page">
      <div className="portal-header">
        <div>
          <h1 className="portal-title">Welcome back, Apex Traders</h1>
          <p className="portal-subtitle">Here is your wholesale overview for this week.</p>
        </div>
        <button 
          style={{ 
            background: '#0EA5E9', 
            color: 'white', 
            padding: '0.8rem 1.5rem', 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShoppingCart size={18} /> Quick Reorder
        </button>
      </div>

      <div className="portal-grid">
        {/* Active Subscription Card */}
        <div className="portal-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>ACTIVE SUBSCRIPTION</p>
            <RefreshCw size={16} color="#0EA5E9" />
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#1E3A8A', margin: '0.5rem 0' }}>
            20 Jugs <span style={{ fontSize: '1rem', color: '#64748B' }}>/ week</span>
          </h2>
          <a 
            href="#" 
            style={{ 
              color: '#0EA5E9', 
              textDecoration: 'none', 
              fontWeight: 'bold', 
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Manage Subscription <ChevronRight size={14} />
          </a>
        </div>

        {/* Savings Card */}
        <div className="portal-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>SAVINGS YTD</p>
            <TrendingUp size={16} color="#10B981" />
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#10B981', margin: '0.5rem 0' }}>$1,245.50</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>vs retail pricing</p>
        </div>

        {/* Account Details Card */}
        <div className="portal-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#64748B', fontWeight: 'bold', fontSize: '0.8rem', margin: 0 }}>ACCOUNT DETAILS</p>
            <Building2 size={16} color="#64748B" />
          </div>
          <div style={{ marginTop: '1rem', fontSize: '0.95rem', lineHeight: '1.6' }}>
            <strong>Company:</strong> Apex Traders LLC<br/>
            <strong>Contact:</strong> Jane Doe<br/>
            <strong>Billing:</strong> 123 Logistics Way, Chicago IL
          </div>
        </div>
      </div>
    </div>
  );
}