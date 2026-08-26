import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = email.length > 0 && password.length > 0;

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-sidebar">
        <div className="login-brand">
          <h2>💧 Aquas</h2>
          <h1>Wholesale Logistics Platform</h1>
          <p>Streamlining commercial water delivery, inventory management, and fleet coordination with crystalline efficiency.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="login-form-area">
        <div className="login-box">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">Please enter your credentials to access the admin console.</p>

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="manager@aquapure.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <span className="forgot-password">Forgot Password?</span>
          </div>

          {/* Dual Login Buttons */}
          <div className="dual-buttons">
            <button 
              className="btn-login" 
              disabled={!isFormValid}
              onClick={() => navigate('/manager')}
            >
              Sign in - Manager
            </button>
            <button 
              className="btn-login btn-customer" 
              disabled={!isFormValid}
              onClick={() => navigate('/portal')}
            >
              Sign in - Customer
            </button>
          </div>

          {/* Guest link ain karapu footer eka */}
          <div className="login-footer-links">
            <p>Don&apos;t have an account? <span className="link-bold" onClick={() => navigate('/register')}>Create an Account</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}