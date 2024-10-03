import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import {
  useGetEventChairs,
  useGetEventChairsByTracks,
} from '@/hooks/manage/tracksHooks'
import { useGetEvent } from '@/hooks/events/useEventState'

export default function TracksConfigPage() {
  const eventData = useGetEvent()
  const chairsData = useGetEventChairs()

  const tracksSettled = eventData.data?.tracks
  const chairsSettled = chairsData.data

  const {
    data: tracksByChair,
    isPending,
    error,
  } = useGetEventChairsByTracks({
    enabled: !!tracksSettled && !!chairsSettled,
  })

  const component = (
    <Page
      event={eventData.data}
      chairs={chairsData.data}
      tracksByChair={tracksByChair || []}
    />
  )
  return (
    <FetchStatus
      component={component}
      isPending={isPending || eventData.isPending || chairsData.isPending}
      error={error || eventData.error || chairsData.error}
    />
  )
}
