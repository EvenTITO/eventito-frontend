import { BrowserRouter } from "react-router-dom";
import RoutesAuth from "./pages/auth/routes";
import RoutesHome from "./pages/home/routes";
import RoutesManage from "./pages/manage/routes";
import RoutesParticipants from "./pages/participants/routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesAuth />
      <RoutesHome />
      <RoutesManage />
      <RoutesParticipants />
    </BrowserRouter>
  );
}

export default App;
