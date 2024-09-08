import { Route, Routes } from "react-router-dom";
import LayoutEvents from "./layout";
import EventViewPage from "./[id]/view";
import ChairPage from "./[id]/roles/chair";
import ReviewerPage from "./[id]/roles/reviewer";
import AuthorPage from "./[id]/roles/author";

export default function RoutesEvents() {
  return (
    <Routes>
      <Route path="/events2" element={<LayoutEvents />}>
        <Route path="/events2/:id/view" element={<EventViewPage />} />
        <Route path="/events2/:id/view/general" element={<EventViewPage />} />
        <Route path="/events2/:id/roles/chair" element={<ChairPage />} />
        <Route path="/events2/:id/roles/reviewer" element={<ReviewerPage />} />
        <Route path="/events2/:id/roles/author" element={<AuthorPage />} />
      </Route>
    </Routes>
  );
}
