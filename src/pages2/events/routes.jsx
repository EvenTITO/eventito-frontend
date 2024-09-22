import { Route, Routes } from "react-router-dom";
import EventViewPage from "./[id]/view/page";
import LayoutEvents from "./layout";
import EventRegistrationPage from "./[id]/register/page";

export default function RoutesEvent() {
  return (
    <Routes>
      <Route path="/events" element={<LayoutEvents />}>
        <Route path="/events/:id/view" element={<EventViewPage />} />
        <Route path="/events/:id/view/general" element={<EventViewPage />} />
      </Route>
        <Route path="/events/:id/register" element={<EventRegistrationPage />} />
    </Routes>
  );
}
