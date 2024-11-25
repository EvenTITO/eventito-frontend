import { Route, Routes } from 'react-router-dom'
import HomePage from '.'
import LayoutHome from './layout'

export default function RoutesHome2() {
  return (
    <Routes>
      <Route path="/home2" element={<LayoutHome />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  )
}
