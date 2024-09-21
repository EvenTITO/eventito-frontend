import { Route, Routes } from "react-router-dom";
import LayoutAuth from "./layout";
import LoginPage from "./login/page";

export default function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<LayoutAuth />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}
