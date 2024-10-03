import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './layout'
import AdminMembersPage from './members'
import AdminEventsPage from './events'

export default function RoutesAdmin() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<AdminMembersPage />} />
        <Route path="members" element={<AdminMembersPage />} />
        <Route path="events" element={<AdminEventsPage />} />
      </Route>
    </Routes>
  )
}
