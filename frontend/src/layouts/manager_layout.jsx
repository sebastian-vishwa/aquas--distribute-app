import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarManager from '../components/manager/sidebar_manager';
import './manager_layout.css';

export default function ManagerLayout() {
  return (
    <div className="manager-layout-wrapper">
      <SidebarManager />
      <main className="manager-main-content">
        <Outlet />
      </main>
    </div>
  );
}