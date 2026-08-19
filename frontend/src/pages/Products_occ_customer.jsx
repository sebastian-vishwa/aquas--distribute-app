import React from 'react';
import './Products_occ_customer.css';

export default function Products() {
  return (
    <div className="products-wrapper">
      {/* HERO SECTION - Updated to Default Blue */}
      <header className="products-hero">
        <div className="hero-content">
          <span className="subtitle">Wholesale Bundles</span>
          <h1>Bulk Hydration Solutions For Your Business</h1>
          <p>Streamline your supply chain with our high-volume water bundles. Designed for corporate offices, retail distributors, and industrial facilities.</p>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Pallet Image Here</div>
        </div>
      </header>

      {/* BUNDLES GRID */}
      <section className="bundles-section">
        <div className="section-header">
          <h2>Available Bundles</h2>
          <div className="view-toggles">
            <button className="icon-btn active">⊞</button>
            <button className="icon-btn">≣</button>
          </div>
        </div>

        <div className="bundles-grid">
          {/* Card 1 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">5-Gallon Jar Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>5-Gallon Jar</h3>
                <span className="badge">BUNDLE OF 5</span>
              </div>
              <p>Standard size for office water dispensers. Reverse osmosis purified.</p>
              <div className="price-row">
                <h2>$34.95</h2>
                <span className="old-price">$42.50</span>
              </div>
              <button className="btn-cart" onClick={() => alert('Added to cart!')}>🛒 Add to Cart</button>
            </div>
          </div>

          {/* Card 2 (Best Seller) */}
          <div className="bundle-card best-seller">
            <span className="best-seller-tag">BEST SELLER</span>
            <div className="card-img-placeholder">19L Bottle Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>19L Bottle</h3>
                <span className="badge">BUNDLE OF 3</span>
              </div>
              <p>Premium mineral water enriched with essential electrolytes.</p>
              <div className="price-row">
                <h2>$28.50</h2>
              </div>
              <button className="btn-cart" onClick={() => alert('Added to cart!')}>🛒 Add to Cart</button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">0.5L Small Bottles Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>0.5L Small Bottles</h3>
                <span className="badge outline">CASE OF 24</span>
              </div>
              <p>Perfect for retail resale or large corporate events.</p>
              <div className="price-row">
                <h2>$12.99</h2>
                <span className="per-unit">/ case</span>
              </div>
              <button className="btn-cart" onClick={() => alert('Added to cart!')}>🛒 Add to Cart</button>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bundle-card">
            <div className="card-img-placeholder">1.5L Bottles Image</div>
            <div className="card-content">
              <div className="card-title-row">
                <h3>1.5L Bottles</h3>
                <span className="badge outline">CASE OF 12</span>
              </div>
              <p>Ideal for daily hydration needs. BPA-free packaging.</p>
              <div className="price-row">
                <h2>$14.50</h2>
                <span className="per-unit">/ case</span>
              </div>
              <button className="btn-cart" onClick={() => alert('Added to cart!')}>🛒 Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="load-more-container">
          <button className="btn-outline-dark">Load More Products</button>
        </div>
      </section>

      {/* SPECS TABLE */}
      <section className="specs-section">
        <h2>Pallet Configuration Specs</h2>
        <table className="specs-table">
          <thead>
            <tr>
              <th>PRODUCT</th>
              <th>UNITS / BUNDLE</th>
              <th>BUNDLES / PALLET</th>
              <th>PALLET WEIGHT (LBS)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>5-Gallon Jar</strong></td>
              <td>5 Jars</td>
              <td>40 Bundles</td>
              <td>1,750</td>
            </tr>
            <tr>
              <td><strong>19L Bottle</strong></td>
              <td>3 Bottles</td>
              <td>50 Bundles</td>
              <td>1,820</td>
            </tr>
            <tr>
              <td><strong>0.5L Small Bottles</strong></td>
              <td>24 Bottles / Case</td>
              <td>72 Cases</td>
              <td>1,850</td>
            </tr>
            <tr>
              <td><strong>1.5L Bottles</strong></td>
              <td>12 Bottles / Case</td>
              <td>80 Cases</td>
              <td>2,450</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}