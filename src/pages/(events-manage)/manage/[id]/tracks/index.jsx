import Page from './page'
import {
  useGetEventChairs,
  useGetEventChairsByTracks,
} from '@/hooks/manage/tracksHooks'
import { useEvent } from '@/lib/layout'

export default function TracksConfigPage() {
  const eventData = useEvent()
  const chairsData = useGetEventChairs()

  const tracksSettled = eventData?.tracks
  const chairsSettled = chairsData.data

  const {
    data: tracksByChair,
    isPending,
    error,
  } = useGetEventChairsByTracks({
    enabled: !!tracksSettled && !!chairsSettled,
  })

  if (!isPending && tracksByChair) {
    console.log('listo')
  }

  return (
    <Page
      event={eventData}
      chairs={chairsData.data}
      tracksByChair={tracksByChair || []}
      chairsDataPending={isPending}
    />
  )
}
