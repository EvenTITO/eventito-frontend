import { ORGANIZER_ROLE } from "@/lib/Constants";
import { hasRole } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

export default function OrganizerPermissions() {
  if (hasRole(ORGANIZER_ROLE)) {
    return <Outlet />;
  } else {
    return <Navigate to="/event/view" replace />;
  }
}
