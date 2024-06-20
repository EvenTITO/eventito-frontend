import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

export default function AdminLayout() {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser !== null && currentUser.role === "ADMIN") {
    return <Layout />;
  } else {
    return <Navigate to='/' replace />;
  }
};

