import React from 'react';
import './Footer_occ_cus';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cols">
        <div className="col">
          <h3 className="footer-logo">💧 AquaPure</h3>
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
          <p>✉️ wholesale@aquapure.com</p>
          <p>📞 1-800-AQUA-PURE</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 AquaPure Wholesale. All rights reserved.</p>
      </div>
    </footer>
  );
}