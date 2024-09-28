import { BrowserRouter } from "react-router-dom";
import RoutesAuth from "./pages2/auth/routes";
import RoutesHome from "./pages2/home/routes";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/services/firebase/firebaseAuth.js";
import { logout } from "./state/user/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import RoutesAdmin from "./pages2/admin/routes";
import RoutesEvents from "./pages/(events-manage)/events/routes";
import RouteViewEvent from "./pages/(events-manage)/view/routes";
import RoutesOrganization from "./pages/(events-manage)/manage/routes";

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
      <RoutesEvents />
      <RouteViewEvent />
      <RoutesOrganization />
    </BrowserRouter>
  );
}

export default App;
