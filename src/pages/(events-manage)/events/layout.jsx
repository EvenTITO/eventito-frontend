import { Outlet } from 'react-router-dom'
import Header from '../_components/Header'
import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import EventSidebar from './_components/Sidebar'
import { ORGANIZER_ROLE } from '@/lib/Constants'

export default function LayoutEvents() {
  const { data: eventData, isPending } = useGetEvent()

  const layoutComponent = <Layout eventData={eventData} />
  return (
    <FetchStatus
      isPending={isPending}
      error={false}
      component={layoutComponent}
    />
  )
}

function Layout({ eventData }) {
  const roles = eventData?.roles || []
  const eventTitle = eventData?.title || ''
  const isOrganizer = roles.includes(ORGANIZER_ROLE)

  return (
    <div className="flex h-screen bg-white">
      <EventSidebar eventTitle={eventTitle} roles={roles} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header eventTitle={eventTitle} isOrganizer={isOrganizer} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet context={{ event: eventData }} />
        </main>
      </div>
    </div>
  )
}
