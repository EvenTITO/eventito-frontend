import { Outlet, useParams } from 'react-router-dom'
import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import Header from '@/pages/_components/Headers/home-admin'

export default function LayoutViewEvent() {
  const { id: eventId } = useParams()
  const { data: eventData, isPending } = useGetEvent(eventId)

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

function Layout({ eventTitle }) {
  const { id } = useParams()
  const tabs = [
    { type: 'normal', label: 'General', to: `${id}/` },
    { type: 'normal', label: 'Inscripción', to: `${id}/register` },
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />

      <div className="pt-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
