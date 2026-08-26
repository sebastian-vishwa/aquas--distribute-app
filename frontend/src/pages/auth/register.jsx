import React from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirects back to login page upon form submission
    navigate('/login');
  };

  return (
    <div className="register-page">
      {/* Top Bar */}
      <div className="register-topbar">
        <h3 className="brand-logo" onClick={() => navigate('/')}>💧 Aquas</h3>
        <span className="help-link">🎧 Need Help?</span>
      </div>

      <div className="register-container">
        <div className="register-header">
          <h1>Regular Partner Registration</h1>
          <p>Join the AquaPure wholesale network for reliable, high-volume water delivery.</p>
        </div>

        {/* Mock Progress Tracker */}
        <div className="progress-tracker">
          <div className="step active"><div className="circle">1</div><span>Verification</span></div>
          <div className="line"></div>
          <div className="step"><div className="circle inactive">2</div><span>Business</span></div>
          <div className="line"></div>
          <div className="step"><div className="circle inactive">3</div><span>Location</span></div>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Section 1 */}
          <div className="form-section">
            <h3 className="section-title">👤 Personal & Verification</h3>
            <div className="form-row photo-row">
              <div className="input-group">
                <label>Profile Photo</label>
                <div className="photo-upload-box">📷</div>
              </div>
              <div className="input-group full-width">
                <label>Full Legal Name</label>
                <input type="text" placeholder="e.g. Jane Doe" required />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>Government ID Number</label>
                <input type="text" placeholder="ID or Passport Number" required />
              </div>
              <div className="input-group">
                <label>Primary Phone</label>
                <div className="phone-input">
                  <span className="country-code">+1</span>
                  <input type="tel" placeholder="(555) 123-4567" required />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="form-section">
            <h3 className="section-title">🏢 Business Details</h3>
            <div className="input-group">
              <label>Business/Shop Name</label>
              <input type="text" placeholder="e.g. Acme Distribution" required />
            </div>
            <div className="input-group">
              <label>Business Verification Image (Storefront or License)</label>
              <div className="file-upload-box">
                <span>☁️ Click to upload document</span>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="form-section">
            <h3 className="section-title">🚚 Delivery Location Matrix</h3>
            <div className="input-group">
              <label>Street Address</label>
              <input type="text" placeholder="123 Warehouse Row" required />
            </div>
            <div className="form-row">
              <div className="input-group">
                <label>City/Region</label>
                <input type="text" placeholder="Metropolis" required />
              </div>
              <div className="input-group">
                <label>Postal Code</label>
                <input type="text" placeholder="10001" required />
              </div>
            </div>
            <div className="input-group">
              <label>Delivery Landmarks / Instructions</label>
              <textarea rows="3" placeholder="e.g. Blue building next to the auto shop. Use rear loading dock."></textarea>
            </div>
            <div className="input-group">
              <div className="label-row">
                <label>Pinpoint Location</label>
                <span className="location-link">📍 Use Current Location</span>
              </div>
              <div className="map-placeholder">
                <span>📍 Click to set exact pin</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">Submit Application</button>
          </div>
        </form>

        <div className="register-footer">
          <p>By submitting this application, you agree to AquaPure&apos;s <span className="link">Terms of Service</span> and <span className="link">Privacy Policy</span>.</p>
        </div>
      </div>
    </div>
  );
}