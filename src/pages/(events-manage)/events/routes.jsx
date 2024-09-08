import { Route, Routes } from "react-router-dom";
import EventViewPage from "./[id]/view";
import LayoutEvents from "./layout";

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
