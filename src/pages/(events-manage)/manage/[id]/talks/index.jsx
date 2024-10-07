import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import Page from './page'
import { useGetAllWorksForOrganizer } from '@/hooks/manage/talksHooks'

export default function TalksDataPage() {
  const rooms = useGetEvent(
    (data) => data.mdata?.rooms.map((room) => room.name) || []
  )
  const works = useGetAllWorksForOrganizer()
  if (works.data) {
    console.log('trabajos', works.data)
  }

  const component = <Page works={works.data || []} rooms={rooms.data} />
  return (
    <FetchStatus
      component={component}
      isPending={rooms.isPending}
      error={rooms.error}
    />
  )
}
