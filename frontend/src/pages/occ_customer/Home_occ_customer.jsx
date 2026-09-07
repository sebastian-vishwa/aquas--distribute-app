import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Truck, ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import './Home_occ_customer.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper" style={{ padding: '2rem 5%' }}>
      
      {/* HERO SECTION */}
      <header 
        className="hero-section"
        style={{
          backgroundColor: '#0A3D91',
          borderRadius: '12px',
          padding: '4rem',
          marginBottom: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        <div className="hero-content" style={{ flex: 1 }}>
          <span 
            className="subtitle"
            style={{
              color: '#93C5FD',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontWeight: 700,
              display: 'inline-block'
            }}
          >
            PURE & REFRESHING
          </span>
          <h1 style={{ fontSize: '2.5rem', margin: '0.8rem 0', lineHeight: 1.2, color: '#ffffff' }}>
            Enterprise Hydration, Delivered Seamlessly.
          </h1>
          <p 
            style={{
              color: '#E0F2FE',
              fontSize: '1.05rem',
              maxWidth: '500px',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            Power your workplace with our multi-stage purified water. From smart fleet logistics to flexible corporate subscriptions, we ensure your business never runs dry.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Order Now <ArrowRight size={18} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
            <button className="btn-outline" onClick={() => navigate('/about#contact')}>
              <Mail size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Contact Us
            </button>
          </div>
        </div>
        <div 
          className="hero-image"
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            borderRadius: '12px',
            minHeight: '250px',
            height: '320px',
            border: 'none'
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1550508122-38d5a1b32d56?auto=format&fit=crop&w=800&q=80" 
            alt="Fresh Water Delivery" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} 
          />
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="feature-card">
          <div className="icon-wrapper" style={{ marginBottom: '10px', color: '#0A3D91' }}>
            <Filter size={36} strokeWidth={1.75} />
          </div>
          <h3>7-Step Filtration</h3>
        </div>
        
        <div className="feature-card">
          <div className="icon-wrapper" style={{ marginBottom: '10px', color: '#0A3D91' }}>
            <Truck size={36} strokeWidth={1.75} />
          </div>
          <h3>Free Delivery</h3>
        </div>
        
        <div className="feature-card">
          <div className="icon-wrapper" style={{ marginBottom: '10px', color: '#0A3D91' }}>
            <ShieldCheck size={36} strokeWidth={1.75} />
          </div>
          <h3>100% Certified Safe</h3>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-image">
          <div className="image-placeholder">Office Water Image Here</div>
        </div>
        <div className="about-content">
          <h2><span className="highlight">Pure Water</span> Is The Foundation Of Good Health</h2>
          <p>We are dedicated to providing the cleanest, healthiest, and most refreshing mineral water to our local community. Our state-of-the-art purification process removes all harmful contaminants while retaining essential natural minerals.</p>
          <p>Whether you need a single 5-gallon jar for your dispenser or bulk orders for a corporate event, our fast delivery fleet ensures you never run out of pure hydration.</p>
          <button className="btn-primary" onClick={() => navigate('/about')}>Learn More</button>
        </div>
      </section>

      {/* DEAL OF THE MONTH */}
      <section className="deal-section">
        <div className="deal-image">
          <div className="image-placeholder">Single Jug Image Here</div>
        </div>
        <div className="deal-card">
          <span className="deal-subtitle">SPECIAL CORPORATE PACKAGE</span>
          <h2>DEAL OF THE MONTH</h2>
          <h1 className="price">Rs. 4,999</h1>
          <h4>Free Dispenser + 3 Bottles (5 Gal)</h4>
          <p>Subscribe to our standard yearly office plan and get a premium hot & cold water dispenser completely free for the first month.</p>
          
          <div className="countdown">
            <div className="time-box"><h2>0-</h2><span>DAYS</span></div>
            <div className="time-box"><h2>16</h2><span>HOURS</span></div>
            <div className="time-box"><h2>10</h2><span>MINS</span></div>
            <div className="time-box"><h2>14</h2><span>SECS</span></div>
          </div>
          <button className="btn-primary full-width" onClick={() => navigate('/products')}>Claim Offer</button>
        </div>
      </section>

    </div>
  );
}