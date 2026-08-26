import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Truck, ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import './Home_occ_customer.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      
      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-content">
          <span className="subtitle">PURE & REFRESHING</span>
          <h1>Premium Mineral Water Delivered To Your Door</h1>
          <p>Stay hydrated with our multi-stage purified drinking water. Perfect for homes, offices, and events. Quick delivery and flexible monthly packages tailored just for you.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/products')}>
              Order Now <ArrowRight size={18} style={{ marginLeft: '6px', verticalAlign: 'middle' }} />
            </button>
            <button className="btn-outline">
              <Mail size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Contact Us
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Hero Image Here</div>
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