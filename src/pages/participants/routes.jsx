import { Route, Routes } from "react-router-dom";
import LayoutParticipants from "../participants/layout";
import ReviewerPage from "./reviewer/page";
import ChairPage from "./chair/page";
import AuthorPage from "./author/page";
import OrganizerDummyPage from "./organizer/page";
import MyPaymentsPage from "./assistant/my-payments/page";
import InscriptionPage from "./assistant/inscription/page";
import NewPaymentPage from "./assistant/my-payments/new/page";

export default function RoutesParticipants() {
  return (
    <Routes>
      <Route path="/events" element={<LayoutParticipants />}>
        <Route path="/events/:id/panel/assistant" element={<ReviewerPage />} />
        <Route
          path="/events/:id/panel/assistant/my-payments"
          element={<MyPaymentsPage />}
        />
        <Route
          path="/events/:id/panel/assistant/inscription"
          element={<InscriptionPage />}
        />
        <Route path="/events/:id/panel/chair" element={<ChairPage />} />
        <Route path="/events/:id/panel/author" element={<AuthorPage />} />
        <Route path="/events/:id/panel/reviewer" element={<ReviewerPage />} />
        <Route
          path="/events/:id/panel/organizer"
          element={<OrganizerDummyPage />}
        />
      </Route>
      <Route
        path="/events/:id/panel/assistant/my-payments/new"
        element={<NewPaymentPage />}
      />
    </Routes>
  );
}
