import { Route, Routes } from "react-router-dom";
import LayoutParticipants from "../participants/layout";

export default function RoutesParticipants() {
  return (
    <Routes>
      <Route path="/events" element={<LayoutParticipants />}>
        <Route path="/events/:id/panel/assistant" element={< />} />
        <Route path="/events/:id/panel/chair" element={< />} />
        <Route path="/events/:id/panel/author" element={< />} />
        <Route path="/events/:id/panel/reviewer" element={< />} />
      </Route>
    </Routes>
  );
}
