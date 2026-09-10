import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './components/common/CartContext'; 

// Auth Pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';

// Layouts
import PublicLayout from './layouts/guest_layouts'; 
import ManagerLayout from './layouts/manager_layout';
import CustomerLayout from './layouts/customer_layout'; 

// Occasional / Guest Pages
import HomeOccCustomer from './pages/occ_customer/Home_occ_customer';
import ProductsOccCustomer from './pages/occ_customer/Products_occ_customer';
import AboutOccCustomer from './pages/occ_customer/About_occ_customer';
import Checkout from './pages/occ_customer/Checkout';
import UnderDevelopment from './pages/occ_customer/UnderDevelopment';

// Regular Customer Portal Pages
import DashboardRegCus from './pages/reg_customer/dashboard_reg_cus';
import DeliveriesRegCus from './pages/reg_customer/deliveries_reg_cus';
import OrdersRegCus from './pages/reg_customer/orders_reg_cus';
import ProductsRegCus from './pages/reg_customer/products_reg_cus';
import CheckoutRegCus from './pages/reg_customer/checkout_reg_cus';
import { RegCartProvider } from './context/RegCartContext';

// Manager Pages
import ManagerDashboard from './pages/manager/manager_dashboard';
import Inventory from './pages/manager/inventory';
import Orders from './pages/manager/orders';
import FleetManagement from './pages/manager/fleet_management';
import Customers from './pages/manager/customers';
import Reports from './pages/manager/reports';
import Promotions from './pages/manager/promotions';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Guest Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomeOccCustomer />} />
            <Route path="/products" element={<ProductsOccCustomer />} />
            <Route path="/about" element={<AboutOccCustomer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<UnderDevelopment />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Registered Customer Portal Routes */}
          <Route
            path="/portal"
            element={
              <RegCartProvider>
                <CustomerLayout />
              </RegCartProvider>
            }
          >
            <Route index element={<DashboardRegCus />} />
            <Route path="products" element={<ProductsRegCus />} />
            <Route path="orders" element={<OrdersRegCus />} />
            <Route path="deliveries" element={<DeliveriesRegCus />} />
            <Route path="checkout" element={<CheckoutRegCus />} />
          </Route>

          {/* Manager Admin Console Routes */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="fleet" element={<FleetManagement />} />
            <Route path="customers" element={<Customers />} />
            <Route path="reports" element={<Reports />} />
            <Route path="/manager/promotions" element={<Promotions />}/>
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}