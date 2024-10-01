import { Route, Routes } from 'react-router-dom'
import LayoutAuth from './layout'
import LoginPage from './login/page'
import SignupPage from './signup/page'
import CompleteRegisterPage from './complete-register/page'

export default function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<LayoutAuth />}>
        <Route index element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="complete-register" element={<CompleteRegisterPage />} />
      </Route>
    </Routes>
  )
}
