import { ORGANIZER_ROLE } from '@/lib/Constants'
import SideBar from '@/pages/(events-manage)/_components/Sidebar'
import {
  MapPin,
  BookOpenCheck,
  DollarSign,
  FilePenLine,
  Settings,
  Table,
  Users,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function OrganizationSidebar({ eventTitle }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside
      className={`bg-gray-100 transition-all duration-300 ease-in-out flex flex-col h-screen ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="p-4 flex items-center justify-between">
        <h1 className={`font-semibold truncate ${isCollapsed ? 'hidden' : ''}`}>
          {eventTitle}
        </h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronDown
            className={`h-4 w-4 transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>
      <SideBar
        itemList={itemList}
        isSidebarOpen={!isCollapsed}
        roles={[ORGANIZER_ROLE]}
      />
    </aside>
  )
}

const classNameIcons = 'mr-2 h-4 w-4'
const itemList = [
  {
    label: 'Configuración',
    children: [
      {
        label: 'General',
        icon: <Settings className={classNameIcons} />,
        to: 'general',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
      {
        label: 'Comité de miembros',
        icon: <Users className={classNameIcons} />,
        to: 'members',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
      {
        label: 'Revisiones',
        icon: <FilePenLine className={classNameIcons} />,
        to: 'reviews',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
      {
        label: 'Tracks',
        icon: <Table className={classNameIcons} />,
        to: 'tracks',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
      {
        label: 'Tarifas',
        icon: <DollarSign className={classNameIcons} />,
        to: 'pricing',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
      {
        label: 'Salas',
        icon: <MapPin className={classNameIcons} />,
        to: 'rooms',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
    ],
  },
  {
    label: 'Datos del evento',
    children: [
      {
        label: 'inscripciones',
        icon: <BookOpenCheck className={classNameIcons} />,
        to: 'inscriptions',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
    ],
  },
]
