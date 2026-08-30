import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/common/CartContext'; 
import Checkout from './pages/occ_customer/Checkout';
// 1. Auth Pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';

// 2. Layouts
import PublicLayout from './layouts/guest_layouts'; 
import ManagerLayout from './layouts/manager_layout';
import CustomerLayout from './layouts/customer_layout'; 

// 3. Occasional / Guest Pages
import HomeOccCustomer from './pages/occ_customer/Home_occ_customer';
import ProductsOccCustomer from './pages/occ_customer/Products_occ_customer';
import AboutOccCustomer from './pages/occ_customer/About_occ_customer';

// 4. Regular Customer Portal Pages
import DashboardRegCus from './pages/reg_customer/dashboard_reg_cus';
import DeliveriesRegCus from './pages/reg_customer/deliveries_reg_cus';
import OrdersRegCus from './pages/reg_customer/orders_reg_cus';
import ProductsRegCus from './pages/reg_customer/products_reg_cus';

// 5. Manager Pages
import ManagerDashboard from './pages/manager/manager_dashboard';
import Inventory from './pages/manager/inventory';
import Orders from './pages/manager/orders';
import FleetManagement from './pages/manager/fleet_management';
import Customers from './pages/manager/customers';
import Reports from './pages/manager/reports';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* METHANATA <Routes> TAG EKA ADD KARANNA */}
        <Routes>
          
          {/* GUEST ROUTES */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomeOccCustomer />} />
            <Route path="/products" element={<ProductsOccCustomer />} />
            <Route path="/about" element={<AboutOccCustomer />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* REGISTERED CUSTOMER PORTAL */}
          <Route path="/portal" element={<CustomerLayout />}>
            <Route index element={<DashboardRegCus />} />
            <Route path="products" element={<ProductsRegCus />} />
            <Route path="orders" element={<OrdersRegCus />} />
            <Route path="deliveries" element={<DeliveriesRegCus />} />
          </Route>

          {/* MANAGER ADMIN CONSOLE */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
        {/* METHANIN <Routes> EKA CLOSE KARANNA */}
      </BrowserRouter>
    </CartProvider>
  );
}