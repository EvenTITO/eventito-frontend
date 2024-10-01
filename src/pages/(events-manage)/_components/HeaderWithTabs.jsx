import { Button } from '@/components/ui/button'
import { List, ChevronDown, ArrowLeft, LogOut } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn, getEventId } from '@/lib/utils'
import { useLogout } from '@/hooks/auth/authHooks.js'

export default function HeaderWithTabs({ toggleSidebar, tabs }) {
  const location = useLocation().pathname
  const eventId = getEventId()
  const navigate = useNavigate()
  const logout = useLogout()

  const handleLogout = async () => {
    await logout.mutateAsync()
    console.log('Bye !!')
    navigate('/')
  }

  return (
    <header className="h-16 bg-[#121827] flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50 text-white">
      <div className="flex items-center">
        <GoBack />
        <div className={`h-6 border-l border-gray-500 mx-4`}></div>
        <Button
          variant="outline"
          size="icon"
          className="mr-4 md:hidden"
          onClick={toggleSidebar}
        >
          <List className="h-4 w-4" />
        </Button>
        <nav className="hidden md:flex space-x-6">
          {tabs.map((tab) =>
            tab.type === 'parent' ? (
              <ParentTab key={tab.id} tab={tab} />
            ) : (
              <RegularTab
                key={tab.id}
                tab={tab}
                isSelected={
                  tab.to.split(eventId)[1] === location.split(eventId)[1]
                }
              />
            )
          )}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Button onClick={handleLogout} variant="table" size="icon">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

function ParentTab({ tab }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 text-white hover:text-gray-300"
        >
          <span>{tab.label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {tab.children?.map((childTab) => (
          <DropdownMenuItem key={childTab.id} asChild>
            <Link
              to={childTab.to || '#'}
              className="block w-full px-2 py-2 text-sm"
            >
              {childTab.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function RegularTab({ tab, isSelected }) {
  const style = isSelected
    ? 'text-white hover:text-gray-100'
    : 'text-tabNotSelected hover:text-gray-300'

  return (
    <Link
      to={tab.to || '#'}
      className={cn('flex items-center space-x-1', style)}
    >
      {tab.label}
    </Link>
  )
}

function GoBack() {
  return (
    <Link
      to="/home"
      className="flex items-center gap-2 text-tabNotSelected hover:text-white"
      style={{ fontWeight: 'normal' }}
    >
      <ArrowLeft className="h-4 w-4" />
      <span style={{ fontSize: '0.82rem' }}>inicio</span>
    </Link>
  )
}
