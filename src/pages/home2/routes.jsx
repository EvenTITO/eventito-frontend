import { Route, Routes } from 'react-router-dom'
import HomePage from '.'
import LayoutHome from './layout'
import MyEventsPage from './my-events'
import {
  BASE_URL,
  MY_EVENTS_URL,
  NEW_EVENT_URL,
  PUBLIC_EVENTS_URL,
} from './_components/constants'

export default function RoutesHome2() {
  return (
    <Routes>
      <Route path={BASE_URL} element={<LayoutHome />}>
        <Route index element={<HomePage />} />
        <Route path={MY_EVENTS_URL} element={<MyEventsPage />} />
      </Route>
    </Routes>
  )
}
