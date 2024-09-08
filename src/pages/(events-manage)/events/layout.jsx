import { Outlet } from "react-router-dom";
import Header from "../_components/Header";

export default function LayoutEvents() {
  const title = "Pycon 2024: Exploring the power of Python";

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={false} headerTitle={title} />

      <div className="pt-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

