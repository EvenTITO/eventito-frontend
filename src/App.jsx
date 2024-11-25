import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { onAuthStateChanged } from '@firebase/auth'
import { auth } from '@/services/firebase/firebaseAuth.js'
import { logout } from './state/user/userSlice'
import { useDispatch } from 'react-redux'
import { Toaster } from './components/ui/toaster'
import RoutesAuth from './pages/auth/routes'
import RoutesHome from './pages/home/routes'
import RoutesAdmin from './pages/admin/routes'
import RoutesEvents from './pages/(events-manage)/events/routes'
import RouteViewEvent from './pages/(events-manage)/view/routes'
import RoutesOrganization from './pages/(events-manage)/manage/routes'
import RoutesHome2 from './pages/home2/routes'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoading(false)
      } else {
        dispatch(logout())
        setIsLoading(false)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <BrowserRouter>
      <Toaster />
      <RoutesAuth />
      <RoutesHome />
      <RoutesHome2 />
      <RoutesAdmin />
      <RoutesEvents />
      <RouteViewEvent />
      <RoutesOrganization />
    </BrowserRouter>
  )
}

export default App
