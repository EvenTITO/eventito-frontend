import { isAuthenticated } from "@/lib/routes/isAuthenticated";
import { Navigate, Outlet } from "react-router-dom";

export default function LayoutHome() {
  if (isAuthenticated()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}
