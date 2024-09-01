import { Route, Routes } from "react-router-dom";
import EventViewPage from "./[id]/view/page";
import LayoutEvent from "./layout";

export default function RoutesEvent() {
  return (
    <Routes>
      <Route path="/events" element={<LayoutEvent />}>
        <Route path="/events/:id/view" element={<EventViewPage />} />
        <Route path="/events/:id/view/general" element={<EventViewPage />} />
      </Route>
    </Routes>
  );
}
