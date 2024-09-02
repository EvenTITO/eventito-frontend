import { userAuthenticated } from "@/lib/auth";
import { Navigate, Outlet } from "react-router-dom";

export default function Authentication() {
  if (userAuthenticated()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
