import {
  BriefcaseBusiness,
  Calendar,
  ClipboardPenLine,
  FileCheck,
  FileStack,
  Info,
  Settings,
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

export default function EventSidebar({ roles }) {
  return <SideBar itemList={itemList} isSidebarOpen={true} roles={roles} />
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
      {
        label: 'Panel de organizador',
        icon: <Settings className={classNameIcons} />,
        to: 'general',
        requiredRoles: [ORGANIZER_ROLE],
        isOrganizerRoute: true,
      },
    ],
  },
]
