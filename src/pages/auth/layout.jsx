import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LayoutAuth() {
  const { currentUser } = useSelector((state) => state.user);

  if (currentUser === null) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/home" />;
  }
}
