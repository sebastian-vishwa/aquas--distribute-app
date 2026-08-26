import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

export default function Register() {
  const navigate = useNavigate();

  // 1. Step control state
  const [currentStep, setCurrentStep] = useState(1);

  // 2. Form state holding all fields across all 3 steps
  const [formData, setFormData] = useState({
    // Step 1: Personal & Verification
    fullName: '',
    idNumber: '',
    phone: '',
    email: '',
    password: '',
    // Step 2: Business Details
    businessName: '',
    businessType: 'Wholesale / Distribution',
    // Step 3: Location Matrix
    streetAddress: '',
    city: '',
    postalCode: '',
    deliveryInstructions: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Send the data to your Express backend
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          // Map your frontend state to the exact names your backend User.js expects
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: 'customer'
        }),
      });

      // 2. Parse the backend response
      const data = await response.json();

      // 3. Handle success or failure
      if (response.ok) {
        alert('✅ Application submitted successfully! Welcome to AquaPure.');
        navigate('/login'); // Sends them to the split-screen login page
      } else {
        alert(`❌ Registration failed: ${data.message}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Server error. Make sure your backend terminal is running!');
    }
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

        {/* Dynamic Progress Tracker */}
        <div className="progress-tracker">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <div className={`circle ${currentStep > 1 ? 'completed' : currentStep === 1 ? '' : 'inactive'}`}>
              {currentStep > 1 ? '✓' : '1'}
            </div>
            <span>Verification</span>
          </div>

          <div className={`line ${currentStep > 1 ? 'line-active' : ''}`}></div>

          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <div className={`circle ${currentStep > 2 ? 'completed' : currentStep === 2 ? '' : 'inactive'}`}>
              {currentStep > 2 ? '✓' : '2'}
            </div>
            <span>Business</span>
          </div>

          <div className={`line ${currentStep > 2 ? 'line-active' : ''}`}></div>

          <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
            <div className={`circle ${currentStep === 3 ? '' : 'inactive'}`}>
              3
            </div>
            <span>Location</span>
          </div>
        </div>

        <form className="register-form" onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
          
          {/* ================= STEP 1: Personal & Verification ================= */}
          {currentStep === 1 && (
            <div className="form-section">
              <h3 className="section-title">👤 Step 1: Personal & Verification</h3>
              <div className="form-row photo-row">
                <div className="input-group">
                  <label>Profile Photo</label>
                  <div className="photo-upload-box">📷</div>
                </div>
                <div className="input-group full-width">
                  <label>Full Legal Name</label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Jane Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Government ID Number</label>
                  <input
                    type="text"
                    name="idNumber"
                    placeholder="ID or Passport Number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Primary Phone</label>
                  <div className="phone-input">
                    <span className="country-code">+1</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Account Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="jane@distribution.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Create Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 2: Business Details ================= */}
          {currentStep === 2 && (
            <div className="form-section">
              <h3 className="section-title">🏢 Step 2: Business Details</h3>
              <div className="input-group">
                <label>Business / Shop Name</label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="e.g. Acme Distribution LLC"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Business Sector / Type</label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  style={{
                    padding: '0.8rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                  }}
                >
                  <option value="Wholesale / Distribution">Wholesale / Distribution</option>
                  <option value="Corporate Office">Corporate Office</option>
                  <option value="Retail Storefront">Retail Storefront</option>
                  <option value="Industrial / Factory">Industrial / Factory</option>
                </select>
              </div>

              <div className="input-group">
                <label>Business Verification Document (License / Certificate)</label>
                <div className="file-upload-box">
                  <span>☁️ Click to upload license / certificate (PDF or PNG)</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: Delivery Location ================= */}
          {currentStep === 3 && (
            <div className="form-section">
              <h3 className="section-title">🚚 Step 3: Delivery Location Matrix</h3>
              <div className="input-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="123 Warehouse Row"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>City / Region</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Metropolis"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Delivery Landmarks / Instructions</label>
                <textarea
                  rows="3"
                  name="deliveryInstructions"
                  placeholder="e.g. Blue building next to auto shop. Use rear loading dock."
                  value={formData.deliveryInstructions}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="input-group">
                <div className="label-row">
                  <label>Pinpoint Location</label>
                  <span className="location-link">📍 Use Current Location</span>
                </div>
                <div className="map-placeholder">
                  <span>📍 Click to set exact delivery pin</span>
                </div>
              </div>
            </div>
          )}
          {/* Navigation Action Buttons */}
          <div
            className="form-actions"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #F1F5F9'
            }}
          >
            {/* LEFT SIDE: Back Button */}
            <div style={{ flex: 1, textAlign: 'left' }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn-outline-dark"
                  onClick={handleBack}
                  style={{
                    padding: '0.85rem 1.8rem',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    background: 'white',
                    color: '#1E293B',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: '0.2s'
                  }}
                >
                  ← Back
                </button>
              )}
            </div>

            {/* RIGHT SIDE: Next or Submit Button */}
            <div style={{ flex: 1, textAlign: 'right' }}>
              {currentStep < 3 ? (
                <button
                  type="button"
                  className="btn-submit"
                  onClick={handleNext}
                  style={{
                    padding: '0.85rem 2.5rem',
                    background: '#0EA5E9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  Next Step →
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn-submit"
                  style={{
                    padding: '0.85rem 2.5rem',
                    background: '#10B981', /* Green to indicate final submission */
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Submit Application ✓
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="register-footer">
          <p>
            By submitting this application, you agree to AquaPure&apos;s{' '}
            <span className="link">Terms of Service</span> and{' '}
            <span className="link">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}