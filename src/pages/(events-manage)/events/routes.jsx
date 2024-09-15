import { Route, Routes } from "react-router-dom";
import LayoutEvents from "./layout";
import EventViewPage from "./[id]/view";
import ChairPage from "./[id]/roles/chair";
import ReviewerPage from "./[id]/roles/reviewer";
import AuthorPage from "./[id]/roles/author";
import AssignmentPage from "./[id]/roles/reviewer/assigment";
import ChairWorkPage from "./[id]/roles/chair/work";

export default function RoutesEvents() {
  return (
    <Routes>
      <Route path="/events2" element={<LayoutEvents />}>
        <Route path="/events2/:id/view" element={<EventViewPage />} />
        <Route path="/events2/:id/view/general" element={<EventViewPage />} />
        <Route path="/events2/:id/roles/chair" element={<ChairPage />} />
        <Route
          path="/events2/:id/roles/chair/works/:workId"
          element={<ChairWorkPage />}
        />
        <Route path="/events2/:id/roles/reviewer" element={<ReviewerPage />} />
        <Route
          path="/events2/:id/roles/reviewer/assignments/:assignmentId"
          element={<AssignmentPage />}
        />
        <Route path="/events2/:id/roles/author" element={<AuthorPage />} />
      </Route>
    </Routes>
  );
}
