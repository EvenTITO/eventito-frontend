import { Route, Routes } from "react-router-dom";
import HomePage from "./page";

export default function RoutesHome() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
