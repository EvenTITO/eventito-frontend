import SidebarIcon from '@/components/SidebarIcon'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn, getEventId } from '@/lib/utils'
import { useLogout } from '@/hooks/auth/authHooks.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useNavigator } from '@/lib/navigation'

export default function SideBar({
  itemList,
  isSidebarOpen = true,
  roles = [],
}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useLogout()
  const navigator = useNavigator()

  const filteredItemList = itemList.filter((parent) =>
    parent.children.some((child) =>
      child.requiredRoles.some((role) => roles.includes(role))
    )
  )

  const eventId = getEventId()
  function isItemSelected(item) {
    const pathSegments = location.pathname.split(eventId)
    const currentRoute = pathSegments[1]
    return currentRoute === '/' + item.to
  }

  const handleLogout = async () => {
    await logout.mutateAsync()
    navigator.to('/')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <ScrollArea className="flex-grow">
        <nav className="space-y-2 p-2">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start py-2 text-sm font-normal text-gray-700 hover:bg-gray-200 rounded-sm',
              location.pathname === '/home' && 'bg-gray-200 font-medium'
            )}
            onClick={() => navigate('/home')}
          >
            <SidebarIcon name="Home" />
            {isSidebarOpen && <span className="ml-2">Inicio</span>}
          </Button>
          {filteredItemList.map((parent, index) => (
            <div key={index} className="mb-4">
              {isSidebarOpen && (
                <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-600">
                  {parent.label}
                </div>
              )}
              {parent.children
                .filter((child) =>
                  child.requiredRoles.some((role) => roles.includes(role))
                )
                .map((child, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className={cn(
                      'w-full justify-start py-2 text-sm font-normal text-gray-700 hover:bg-gray-200 rounded-sm mt-1',
                      isItemSelected(child) && 'bg-gray-200 font-medium'
                    )}
                    onClick={() =>
                      child.isOrganizerRoute
                        ? navigate(`/manage/${id}/${child.to}`)
                        : navigate(`/events/${id}/${child.to}`)
                    }
                  >
                    <span className="flex items-center">
                      {child.icon}
                      {isSidebarOpen && (
                        <span className="ml-2">{child.label}</span>
                      )}
                    </span>
                  </Button>
                ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-2 mb-4">
        <Button
          variant="ghost"
          className="w-full justify-start py-2 text-sm font-normal text-gray-700 hover:bg-gray-200 rounded-sm"
          onClick={handleLogout}
        >
          <SidebarIcon name="LogOut" />
          {isSidebarOpen && <span className="ml-2">Cerrar sesión</span>}
        </Button>
      </div>
    </div>
  )
}
