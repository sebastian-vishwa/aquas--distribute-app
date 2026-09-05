import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarRegCus from '../components/customer/navbar_reg_cus';
import '../pages/reg_customer/portal.css'; // We will create this next!

export default function CustomerLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <NavbarRegCus />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}