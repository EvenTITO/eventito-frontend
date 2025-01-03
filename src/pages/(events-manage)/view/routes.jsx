import { Route, Routes } from 'react-router-dom'
import EventViewPage from './[id]/index'
import LayoutViewEvent from './layout'
import ProtectedRoute from './protection'

export default function RouteViewEvent() {
  return (
    <Routes>
      <Route path="/view/events" element={<LayoutViewEvent />}>
        <Route
          path=":id/"
          element={
            <ProtectedRoute>
              <EventViewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path=":id/general"
          element={
            <ProtectedRoute>
              <EventViewPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
