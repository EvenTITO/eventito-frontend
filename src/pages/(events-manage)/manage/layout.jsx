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
    <div className="flex flex-col h-screen bg-background">
      <Header headerTitle={eventTitle} />

      <div className="flex flex-1 pt-16">
        <OrganizationSidebar />
        <main className="flex-1 p-4 md:ml-64 pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
