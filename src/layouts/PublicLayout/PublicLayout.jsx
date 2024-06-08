import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

export default function PublicLayout() {
  const { currentUser } = useSelector((state) => state.user);
  const isAuthenticated = currentUser !== null;

  if (!isAuthenticated) {
    return <Layout />;
  } else {
    return <Navigate to='/' replace />;
  }
};

