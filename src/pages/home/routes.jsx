import { Route, Routes } from "react-router-dom";
import HomePage from "./page";
import LayoutHome from "./layout";
import MyEventsPage from "./my-events/page";

export default function RoutesHome() {
  return (
    <Routes>
      <Route path="/home" element={<LayoutHome />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/my-events" element={<MyEventsPage />} />
      </Route>
    </Routes>
  );
}
