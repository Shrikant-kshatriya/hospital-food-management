import React, { useState } from 'react';
import Header from './global/Header';
import Sidebar from './global/SideBar';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-indigo-50 min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16"> 
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
