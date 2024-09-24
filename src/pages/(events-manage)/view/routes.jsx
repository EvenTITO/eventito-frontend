import { Route, Routes } from "react-router-dom";
import EventViewPage from "./[id]/index";
import LayoutViewEvent from "./layout";
import RegistrationPage from "./[id]/registration";

export default function RouteViewEvent() {
  return (
    <Routes>
      <Route path="/view/events" element={<LayoutViewEvent />}>
        <Route path="/view/events/:id/" element={<EventViewPage />} />
        <Route path="/view/events/:id/general" element={<EventViewPage />} />
        <Route
          path="/view/events/:id/register"
          element={<RegistrationPage />}
        />
      </Route>
    </Routes>
  );
}
