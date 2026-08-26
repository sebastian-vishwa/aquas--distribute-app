import React from 'react';
import { Droplet, Mail, Phone } from 'lucide-react';
import './Footer_occ_cus.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div className="col">
          <h3 className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet size={22} fill="#60A5FA" color="#60A5FA" /> Aquas
          </h3>
          <p>Delivering purity and reliability to businesses and homes nationwide.</p>
        </div>
        <div className="col">
          <h4>COMPANY</h4>
          <a href="#">About Us</a>
          <a href="#">Service Areas</a>
          <a href="#">Logistics Support</a>
          <a href="#">Careers</a>
        </div>
        <div className="col">
          <h4>LEGAL</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Return Policy</a>
        </div>
        <div className="col">
          <h4>CONTACT</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Mail size={16} color="#94A3B8" /> wholesale@aquas.com
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Phone size={16} color="#94A3B8" /> 1-800-AQUA-PURE
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Aquas Wholesale. All rights reserved.</p>
      </div>
    </footer>
  );
}