import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "@/services/firebase/firebaseAuth.js";
import { logout } from "./state/user/userSlice";
import { useDispatch } from "react-redux";
import { Toaster } from "./components/ui/toaster";
import RoutesEvents from "./pages/(events-manage)/events/routes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
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
      <RoutesEvents />
    </BrowserRouter>
  );
}

export default App;
