import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarOccCus from '../components/common/Navbar_occ_cus';
import FooterOccCus from '../components/common/Footer_occ_cus';

export default function PublicLayout() {
  return (
    <>
      <NavbarOccCus />
      <main>
        {/* The Outlet acts as a window where the Home, Products, or About page will appear */}
        <Outlet /> 
      </main>
      <FooterOccCus />
    </>
  );
}