import { Route, Routes } from 'react-router-dom'
import LayoutAdmin from './layout'
import AdminPage from './members'

export default function RoutesAdmin() {
  return (
    <Routes>
      <Route path="/admin" element={<LayoutAdmin />}>
        <Route index element={<AdminPage />} />
        <Route path="members" element={<AdminPage />} />
      </Route>
    </Routes>
  )
}
