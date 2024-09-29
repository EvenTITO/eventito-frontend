import { Route, Routes } from "react-router-dom";
import LayoutOrganization from "./layout";
import GeneralConfigPage from "./[id]";
import MembersConfigPage from "./[id]/members";
import ReviewsConfigPage from "./[id]/reviews";

export default function RoutesOrganization() {
  return (
    <Routes>
      <Route path="/manage" element={<LayoutOrganization />}>
        <Route path="/manage/:id/" element={<GeneralConfigPage />} />
        <Route path="/manage/:id/general" element={<GeneralConfigPage />} />
        <Route path="/manage/:id/view" element={<GeneralConfigPage />} />
        <Route path="/manage/:id/members" element={<MembersConfigPage />} />
        <Route path="/manage/:id/reviews" element={<ReviewsConfigPage />} />
      </Route>
    </Routes>
  );
}
