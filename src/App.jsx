import { BrowserRouter } from "react-router-dom";
import RoutesAuth from "./pages/auth/routes";
import RoutesHome from "./pages/home/routes";
import RoutesManage from "./pages/manage/routes";
import RoutesParticipants from "./pages/participants/routes";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/services/firebase/firebaseAuth.js";
import { logout } from "./state/user/userSlice";
import { useDispatch } from "react-redux";
import RoutesEvent from "./pages/events/routes";
import { Toaster } from "./components/ui/toaster";
import RoutesAdmin from "./pages/admin/routes";
import RoutesEvents from "./pages/(events-manage)/events/routes";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false);
      } else {
        dispatch(logout());
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      <RoutesAuth />
      <RoutesHome />
      <RoutesAdmin />
      <RoutesEvent />
      <RoutesEvents />
      <RoutesManage />
      <RoutesParticipants />
    </BrowserRouter>
  );
}

export default App;
