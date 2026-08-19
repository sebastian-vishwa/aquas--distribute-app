import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar_occ_cus';
import Footer from './components/Footer_occ_cus';
import Home from './pages/Home_occ_customer.jsx';
import Products from './pages/Products_occ_customer';
import About from './pages/About_occ_customer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;