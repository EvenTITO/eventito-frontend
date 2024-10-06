import {
  BriefcaseBusiness,
  Calendar,
  ClipboardPenLine,
  FileCheck,
  FileStack,
  Info,
  PanelLeftClose,
} from 'lucide-react'
import {
  ATTENDEE_ROLE,
  CHAIR_ROLE,
  EVENT_ROLES_LABELS,
  ORGANIZER_ROLE,
  REVIEWER_ROLE,
  SPEAKER_ROLE,
} from '@/lib/Constants.js'
import SideBar from '../../_components/Sidebar'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function EventSidebar({ eventTitle, roles }) {
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
          <PanelLeftClose
            className={`h-4 w-4 transform ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>
      <SideBar itemList={itemList} isSidebarOpen={!isCollapsed} roles={roles} />
    </aside>
  )
}

const classNameIcons = 'mr-2 h-4 w-4'

const itemList = [
  {
    label: 'Evento',
    children: [
      {
        label: 'Información',
        icon: <Info className={classNameIcons} />,
        to: 'view/general',
        requiredRoles: Object.keys(EVENT_ROLES_LABELS),
      },
      {
        label: 'Calendario',
        icon: <Calendar className={classNameIcons} />,
        to: 'view/calendar',
        requiredRoles: Object.keys(EVENT_ROLES_LABELS),
      },
    ],
  },
  {
    label: 'Mis actividades',
    children: [
      {
        label: 'Inscripcion',
        icon: <ClipboardPenLine className={classNameIcons} />,
        to: 'roles/attendee',
        requiredRoles: [ATTENDEE_ROLE, SPEAKER_ROLE],
      },
      {
        label: 'Entregas',
        icon: <BriefcaseBusiness className={classNameIcons} />,
        to: 'roles/author',
        requiredRoles: [SPEAKER_ROLE],
      },
      {
        label: 'Asignaciones de revision',
        icon: <FileCheck className={classNameIcons} />,
        to: 'roles/reviewer',
        requiredRoles: [REVIEWER_ROLE],
      },
    ],
  },
  {
    label: 'Acciones de miembros',
    children: [
      {
        label: 'Tracks',
        icon: <FileStack className={classNameIcons} />,
        to: 'roles/chair',
        requiredRoles: [ORGANIZER_ROLE, CHAIR_ROLE],
      },
    ],
  },
]
