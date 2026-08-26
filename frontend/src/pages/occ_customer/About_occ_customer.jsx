import React from 'react';
import './About_occ_customer.css';

export default function About() {
  return (
    <div className="about-wrapper">
      {/* HERO SECTION */}
      <header className="about-hero">
        <div className="hero-content">
          <h1>Engineering Purity for Scale</h1>
          <p>Since 2010, AquaPure has defined the standard for high-volume, precision-filtered hydration solutions. We supply the infrastructure that keeps industry moving.</p>
        </div>
        <div className="hero-image">
           <div className="image-placeholder">Facility Image Here</div>
        </div>
      </header>

      {/* ORIGIN & VISION SECTION */}
      <section className="origin-vision-section">
        <div className="origin-left">
          <div className="title-row">
            <span className="icon">⏱️</span>
            <h2>The Origin</h2>
          </div>
          <p>AquaPure began with a single observation: industrial hydration was inefficient, inconsistent, and lacked the rigorous quality control demanded by modern enterprises. Founded by logistics engineers, our approach was systematically different from day one.</p>
          <p>We didn't just want to bottle water; we aimed to build a distribution matrix capable of delivering flawless purity at massive scale. Today, our 7-step reverse osmosis process and automated fleet management represent the pinnacle of B2B hydration logistics.</p>
          
          <div className="stats-row">
            <div className="stat"><h2>14+</h2><span>YEARS ACTIVE</span></div>
            <div className="stat"><h2>50M</h2><span>GALLONS DIST.</span></div>
            <div className="stat"><h2>99.9%</h2><span>UPTIME</span></div>
          </div>
        </div>
        
        <div className="vision-right">
          <div className="vision-card">
            <h3>👁️ Our Vision</h3>
            <p>To become the invisible, infallible circulatory system of hydration for global enterprise, where pure water is guaranteed as a basic operational utility.</p>
          </div>
          <div className="mission-card">
            <h3>⚑ Mission Protocol</h3>
            <ul>
              <li>Execute zero-tolerance filtration protocols (0.0001 micron threshold).</li>
              <li>Optimize supply chains for sub-24 hour corporate replenishment.</li>
              <li>Maintain 100% transparency in logistical tracking and water telemetry.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section">
        <div className="team-header">
          <h2>Command Structure</h2>
          <p>The engineering and logistical minds directing AquaPure's operational capacity.</p>
        </div>
        <div className="team-grid">
          {['Robert Vance', 'Elena Rostova', 'Marcus Chen', 'Dr. Sarah Jenkins'].map((name, index) => (
            <div className="team-card" key={index}>
              <div className="avatar-placeholder">Avatar</div>
              <h3>{name}</h3>
              <span className="role">{['CHIEF EXECUTIVE OFFICER', 'CHIEF OPERATIONS OFFICER', 'CHIEF TECHNOLOGY OFFICER', 'HEAD OF QUALITY ASSURANCE'][index]}</span>
              <p>Expertise and leadership blurb goes here detailing their specialized background.</p>
            </div>
          ))}
        </div>
      </section>

     {/* CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-info">
          <h2>Initiate Contact</h2>
          <p>Our logistics team is on standby to calculate volume requirements and establish an optimized delivery matrix for your facility.</p>
          <div className="contact-methods">
            <div className="method">
              <strong>📍 CENTRAL HUB</strong>
              <p>700 Aqua Matrix Blvd.<br/>Industrial Sector 4<br/>Chicago, IL 60607</p>
            </div>
            <div className="method">
              <strong>📞 DIRECT LINE</strong>
              <p>1-800-AQUA-B2B<br/><span className="small-text">(0800 - 1800 CST)</span></p>
            </div>
            <div className="method">
              <strong>✉️ DISPATCH EMAIL</strong>
              <p>logistics@aquapurewholesale.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}