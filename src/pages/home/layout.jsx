import { isAuthenticated } from '@/lib/routes/isAuthenticated'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '@/pages/_components/Headers/home-admin'
import Footer from '@/components/LayoutPage/Footer'

export default function LayoutHome() {
  if (isAuthenticated()) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  } else {
    return <Navigate to={'/login'} />
  }
}
