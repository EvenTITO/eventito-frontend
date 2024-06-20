import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

export default function UncompletedUserLayout() {
  const { idUser, email } = useSelector((state) => state.auth);
  const isAuthenticated = idUser !== null && email !== null;

  if (isAuthenticated) {
    return <Layout />;
  } else {
    return <Navigate to='/login' replace />;
  }
};

