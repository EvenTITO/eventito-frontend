import EventsList from './EventsList'
import { SkeletonList } from '@/components/Skeleton'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import ViewAllEventsButton from './ViewAllEventsButton'

export default function EventsSection({ events, title, navigateTo }) {
  return (
    <div className="space-y-6">
      <TitlePage
        title={title}
        rightComponent={<ViewAllEventsButton navigateTo={navigateTo} />}
      />
      {events.isPending ? (
        <SkeletonList />
      ) : (
        <EventsList events={(events.data || []).slice(0, 6)} />
      )}
    </div>
  )
}
