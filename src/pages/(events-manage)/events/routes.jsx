import { Route, Routes } from "react-router-dom";
import LayoutEvents from "./layout";
import EventViewPage from "./[id]/view";
import ChairPage from "./[id]/roles/chair";
import ReviewerPage from "./[id]/roles/reviewer";
import AuthorPage from "./[id]/roles/author";
import AssignmentPage from "./[id]/roles/reviewer/assigment";
import ChairWorkPage from "./[id]/roles/chair/work";
import AttendeePage from "./[id]/roles/attendee";
import NewPaymentPage from "./[id]/roles/attendee/new-payment/page";
import NewSubmissionPage from "./[id]/roles/author/new-submission";
import ViewSubmissionPage from "./[id]/roles/author/submissions";

export default function RoutesEvents() {
  return (
    <Routes>
      <Route path="/events2" element={<LayoutEvents />}>
        <Route path="/events2/:id/view" element={<EventViewPage />} />
        <Route path="/events2/:id/view/general" element={<EventViewPage />} />

        <Route path="/events2/:id/roles/attendee" element={<AttendeePage />} />

        <Route path="/events2/:id/roles/author" element={<AuthorPage />} />

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
        <Route
          path="/events2/:id/roles/author/new-submission"
          element={<NewSubmissionPage />}
        />
        <Route
          path="/events2/:id/roles/author/submissions/:submissionId"
          element={<ViewSubmissionPage />}
        />
      </Route>

      <Route
        path="/events2/:id/roles/attendee/new-payment"
        element={<NewPaymentPage />}
      />
    </Routes>
  );
}
