import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Layout from "./Layout";

export default function PublicLayout() {
  const { currentUser } = useSelector((state) => state.user);
  const { idUser, email } = useSelector((state) => state.auth);
  const notLoggedIn = currentUser === null;
  const registerUncompleted = idUser !== null && email !== null;

  if (notLoggedIn) {
    if (registerUncompleted) {
      return <Navigate to='/complete-register' replace />;
    } else {
      return <Layout />;
    }
  } else {
    return <Navigate to='/' replace />;
  }
};

