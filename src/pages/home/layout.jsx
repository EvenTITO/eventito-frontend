import { isAuthenticated } from "@/lib/routes/isAuthenticated";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./_components/Header";

export default function LayoutHome() {
  if (isAuthenticated()) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
