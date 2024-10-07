import FetchStatus from '@/components/FetchStatus'
import Page from './page'
import {
  useGetEventChairs,
  useGetEventChairsByTracks,
} from '@/hooks/manage/tracksHooks'
import { useGetEvent } from '@/hooks/events/useEventState'
import { CREATED_STATUS } from '@/lib/Constants.js'

export default function TracksConfigPage() {
  const eventData = useGetEvent()
  const chairsData = useGetEventChairs()

  const tracksSettled = eventData.data?.tracks
  const chairsSettled = chairsData.data
  const canAddOrRemoveTracks = eventData.data.status === CREATED_STATUS

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
      canAddOrRemoveTracks={canAddOrRemoveTracks}
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
