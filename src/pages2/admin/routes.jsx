import { Route, Routes } from "react-router-dom";
import AdminPage from "./page";

export default function RoutesAdmin() {
  return (
    <Routes>
        <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
