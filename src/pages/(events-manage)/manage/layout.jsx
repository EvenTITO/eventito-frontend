import { Outlet } from 'react-router-dom'
import Header from '../_components/Header'
import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import { useEffect } from 'react'
import { useNavigator } from '@/lib/navigation'
import { getEventId } from '@/lib/utils'
import { ORGANIZER_ROLE } from '@/lib/Constants.js'
import OrganizationSidebar from './[id]/_components/Layout/Sidebar'

export default function LayoutOrganization() {
  const { data: eventData, isPending } = useGetEvent()

  const layoutComponent = (
    <Layout
      eventTitle={eventData?.title || ''}
      roles={eventData?.roles || []}
    />
  )
  return (
    <FetchStatus
      isPending={isPending}
      error={false}
      component={layoutComponent}
    />
  )
}

function Layout({ eventTitle, roles }) {
  const eventId = getEventId()
  const navigator = useNavigator()
  const isOrganizer = roles.includes(ORGANIZER_ROLE)

  useEffect(() => {
    if (
      !roles ||
      roles.length === 0 ||
      roles.filter((r) => r === ORGANIZER_ROLE).length === 0
    ) {
      console.log(roles)
      navigator.to(`/view/events/${eventId}`)
    }
  }, [roles])

  return (
    <div className="flex h-screen bg-white">
      <OrganizationSidebar eventTitle={eventTitle} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          eventTitle={eventTitle}
          organizerPage
          isOrganizer={isOrganizer}
        />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
