import EventsList from './EventsList'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import ViewAllEventsButton from './ViewAllEventsButton'
import { SkeletonList } from '@/components/Skeleton'

export default function EventsSection({
  events,
  title,
  navigateTo,
  showAllways = false,
}) {
  if (!showAllways && !events.isPending && events.data.length === 0) {
    return null
  }

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
