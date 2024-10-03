import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './layout'
import AdminMembersPage from './members'

export default function RoutesAdmin() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<AdminMembersPage />} />
        <Route path="members" element={<AdminMembersPage />} />
      </Route>
    </Routes>
  )
}
