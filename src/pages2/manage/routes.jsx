import { Route, Routes } from "react-router-dom";
import LayoutManage from "./layout";
import MembersPage from "./[id]/members/page";
import TracksPage from "./[id]/tracks/page";
import PricesPage from "./[id]/prices/page";
import QuestionsPage from "./[id]/questions/page";
import GeneralPage from "./[id]/general/page";

export default function RoutesManage() {
  return (
    <Routes>
      <Route path="/manage" element={<LayoutManage />}>
        <Route path="/manage/:id" element={<GeneralPage />} />
        <Route path="/manage/:id/general" element={<GeneralPage />} />
        <Route path="/manage/:id/members" element={<MembersPage />} />
        <Route path="/manage/:id/tracks" element={<TracksPage />} />
        <Route path="/manage/:id/prices" element={<PricesPage />} />
        <Route path="/manage/:id/reviews" element={<QuestionsPage />} />
      </Route>
    </Routes>
  );
}
