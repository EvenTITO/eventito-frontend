import { Outlet } from "react-router-dom";
import Sidebar from "./_components/Sidebar";
import { useState } from "react";
import Header from "./_components/Header";

export default function LayoutManage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const title = "Pycon 2024: Exploring the power of Python";

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={toggleSidebar} headerTitle={title} />

      <div className="flex flex-1 pt-16">
        <Sidebar isSidebarOpen={isSidebarOpen} />

        {/* Main content area */}
        <main className="flex-1 p-4 md:ml-64 pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
