import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Truck, ShieldCheck, ArrowRight, Mail } from 'lucide-react';
import heroImage from '../../assets/bottles_cat.png';
import waterBottles from '../../assets/background removed.jpg';
import './Home_occ_customer.css';

export default function Home() {
  const navigate = useNavigate();
  const [catalogueData, setCatalogueData] = useState([]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setCatalogueData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch catalogue:", error);
      }
    };
    fetchCatalogue();
  }, []);

  const dealProduct = catalogueData.length > 0 ? catalogueData[0] : null;
  const discountedPrice = dealProduct ? dealProduct.wholesalePrice * 0.8 : 0;

  return (
    <div className="home-wrapper">

      {/* HERO SECTION */}
      <header
        className="hero-section"
        style={{
          width: '100%',
          minHeight: 'calc(100vh - 75px)',
          backgroundColor: '#0A3D91',
          borderRadius: '0',
          padding: '0 8%',
          margin: 0,
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4rem',
          boxSizing: 'border-box'
        }}
      >
        <div className="hero-content" style={{ flex: 1, maxWidth: '550px' }}>
          <span
            className="subtitle"
            style={{
              color: '#93C5FD',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              display: 'inline-block'
            }}
          >
            PURE & REFRESHING
          </span>
          <h1 style={{ fontSize: '3rem', margin: '0.8rem 0', lineHeight: 1.2, fontWeight: 800, color: '#ffffff' }}>
            Smart Water Logistics for Modern Businesses
          </h1>
          <p
            style={{
              color: '#E0F2FE',
              fontSize: '1.05rem',
              maxWidth: '520px',
              lineHeight: 1.6,
              marginBottom: '2rem'
            }}
          >
            Track orders, manage recurring shipments, and supply your workforce with high-purity water through a centralized, effortless ordering platform.
          </p>
          <div className="hero-buttons" style={{ display: 'flex', gap: '1.2rem' }}>
            <button
              className="btn-primary"
              onClick={() => navigate('/products')}
              style={{
                backgroundColor: '#0d54be',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '0.85rem 2rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Order Now <ArrowRight size={18} />
            </button>
            <button
              className="btn-outline"
              onClick={() => navigate('/about#contact')}
              style={{
                background: 'transparent',
                border: '2px solid #ffffff',
                color: '#ffffff',
                borderRadius: '6px',
                padding: '0.85rem 2rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Mail size={18} /> Contact Us
            </button>
          </div>
        </div>
        <div
          className="hero-image"
          style={{
            flex: 1,
            height: '320px',
            minHeight: '280px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          <img
            src={heroImage}
            alt="Fresh Water Delivery"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
          />
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="features-section" style={{ padding: '5rem 8%' }}>
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
          <h3>Fast Delivery</h3>
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
        <div className="about-image" style={{ background: 'transparent', border: 'none', height: 'auto' }}>
          <div style={{
            width: '450px',
            height: '450px',
            backgroundColor: '#0A3D91',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            boxShadow: '0 10px 25px rgba(10, 61, 145, 0.2)'
          }}>
            <img 
              src={waterBottles} 
              alt="Aquas Water Bottles" 
              style={{ 
                width: '85%', 
                height: 'auto', 
                objectFit: 'contain',
                transform: 'translateY(-10px)' // Nudges the bottles up slightly for a nice 3D pop effect
              }} 
            />
          </div>
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
        <div className="deal-image" style={{ flex: 1, maxHeight: '420px', background: 'transparent', border: 'none', padding: 0 }}>
          {dealProduct && dealProduct.image ? (
            <img 
              src={dealProduct.image} 
              alt={dealProduct.productName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} 
            />
          ) : (
            <span style={{ color: '#93C5FD' }}>Loading Deal Image...</span>
          )}
        </div>
        <div className="deal-card">
          <span className="deal-subtitle">SPECIAL CORPORATE PACKAGE</span>
          <h2>DEAL OF THE MONTH</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0.5rem 0' }}>
            <span style={{ textDecoration: 'line-through', color: '#64748B', fontSize: '1.1rem' }}>
              Rs. {dealProduct?.wholesalePrice?.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
            </span>
            <h2 style={{ color: '#1E3A8A', fontSize: '2.8rem', margin: '0.2rem 0' }}>
              Rs. {discountedPrice.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
            </h2>
          </div>

          <h4>{dealProduct?.productName || 'Special Water Package'}</h4>
          <p>{dealProduct?.description || 'Subscribe to our standard yearly office plan and get high-purity water delivered seamlessly to your workplace.'}</p>

          <div className="countdown">
            <div className="time-box"><h2>0-</h2><span>DAYS</span></div>
            <div className="time-box"><h2>16</h2><span>HOURS</span></div>
            <div className="time-box"><h2>10</h2><span>MINS</span></div>
            <div className="time-box"><h2>14</h2><span>SECS</span></div>
          </div>
          <button className="btn-primary full-width" style={{ padding: '0.75rem' }} onClick={() => navigate('/products')}>Claim Offer</button>
        </div>
      </section>

    </div>
  );
}