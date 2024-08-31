import { Route, Routes } from "react-router-dom";
import LayoutParticipants from "../participants/layout";
import EventViewPage from "./[id]/view/page";

export default function RoutesEvent() {
  return (
    <Routes>
      <Route path="/events" element={<LayoutParticipants />}>
        <Route path="/events/:id/view" element={<EventViewPage />} />
        <Route path="/events/:id/view/general" element={<EventViewPage />} />
      </Route>
    </Routes>
  );
}
