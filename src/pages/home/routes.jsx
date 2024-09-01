import { Route, Routes } from "react-router-dom";
import HomePage from "./page";
import LayoutHome from "./layout";
import MyEventsPage from "./my-events/page";
import CreateEventPage from "./create-event/page";
import TestPage from "./test/page";

export default function RoutesHome() {
  return (
    <Routes>
      <Route path="/home" element={<LayoutHome />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/my-events" element={<MyEventsPage />} />
        <Route path="/home/test" element={<TestPage />} />
      </Route>
      <Route path="/home/create-event" element={<CreateEventPage />} />
    </Routes>
  );
}
