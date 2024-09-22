import { Route, Routes } from "react-router-dom";
import EventViewPage from "./[id]/view";
import LayoutViewEvent from "./layout";

export default function RouteViewEvent() {
  return (
    <Routes>
      <Route path="/view/events" element={<LayoutViewEvent />}>
        <Route path="/view/events/:id/" element={<EventViewPage />} />
        <Route path="/view/events/:id/general" element={<EventViewPage />} />
      </Route>
    </Routes>
  );
}
