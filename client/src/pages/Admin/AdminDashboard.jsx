import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../../components/dashboard/Navbar";

import { useState, useEffect } from "react";
import bg from "../../assets/Auth_Bg.jpg";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  // Listen to screen size change
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Reset sidebar open state on desktop
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="flex h-screen overflow-hidden bg-gray-50 bg-cover"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Always show on desktop, toggle on mobile */}

      <Sidebar
        isOpen={sidebarOpen}
        isMobile={!isDesktop}
        onClose={() => setSidebarOpen(false)}
      />


      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
