import { Route, Routes } from "react-router-dom";
import LayoutEvents from "./layout";
import EventViewPage from "./[id]/view";

export default function RoutesEvents() {
  return (
    <Routes>
      <Route path="/events2" element={<LayoutEvents />}>
        <Route path="/events2/:id/view" element={<EventViewPage />} />
        <Route path="/events2/:id/view/general" element={<EventViewPage />} />
      </Route>
    </Routes>
  );
}
