import { Outlet } from "react-router-dom";
import Header from "./_components/Header";

export default function LayoutEvents() {
  const title = "Pycon 2024: Exploring the power of Python";
  const isSideBar = false;
  const mainClassName = isSideBar ? "flex-1 p-4 md:ml-64 pt-4 overflow-auto" : "";

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={true} headerTitle={title} />

      <div className="pt-12">
        {/* Main content area */}
        <main className={mainClassName}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

