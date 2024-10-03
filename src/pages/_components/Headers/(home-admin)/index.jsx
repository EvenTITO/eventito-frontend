import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useSelector } from 'react-redux'
import { useLogout } from '@/hooks/auth/authHooks.js'
import RoleSelector from './_components/RoleSelector'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mutateAsync: logOut } = useLogout()
  const { currentUser } = useSelector((state) => state.user)
  const [isAdminPage, setIsAdminPage] = useState(
    location.pathname.startsWith('/home')
  )

  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith('/admin'))
  }, [location])

  const handleModeChange = (value) => {
    if (value === 'admin') {
      navigate('/admin')
    } else {
      navigate('/home')
    }
  }

  const handleLogOut = async () => {
    await logOut()
    navigate('/')
  }

  const fixedHeader = 'fixed top-0 left-0 right-0 z-50'
  const headerStyle = 'px-4 lg:px-6 h-14 flex items-center bg-white'
  return (
    <header className={cn(fixedHeader, headerStyle)}>
      <div className="flex items-center">
        <Logo showName={false} bgColor="white" />
        <RoleSelector
          userRole={currentUser.role}
          handleModeChange={handleModeChange}
          isAdminPage={isAdminPage}
        />
      </div>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={isAdminPage ? '/admin' : '/home'}
        >
          {isAdminPage ? 'Miembros' : 'Inicio'}
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          to={isAdminPage ? '/admin/events' : '/home/my-events'}
        >
          {isAdminPage ? 'Solicitudes de eventos' : 'Mis eventos'}
        </Link>
        <Button onClick={handleLogOut} variant="table" size="icon">
          <LogOut className="h-5 w-5" />
        </Button>
      </nav>
    </header>
  )
}
