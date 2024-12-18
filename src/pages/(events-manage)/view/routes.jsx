import { Route, Routes } from 'react-router-dom'
import EventViewPage from './[id]/index'
import LayoutViewEvent from './layout'
import RegistrationPage from './[id]/registration'
import ProtectedRoute from './protection'
import EventViewPage2 from './[id]/view2'

export default function RouteViewEvent() {
  return (
    <Routes>
      <Route path="/view/events" element={<LayoutViewEvent />}>
        <Route
          path=":id/2"
          element={
            <ProtectedRoute>
              <EventViewPage2 />
            </ProtectedRoute>
          }
        />
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
        <Route
          path=":id/register"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}
