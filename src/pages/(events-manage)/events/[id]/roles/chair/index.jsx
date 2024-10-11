import { useEffect, useState } from 'react'
import { useGetMyTracks, useGetWorksByTrack } from '@/hooks/events/chairHooks'
import Page from './page'
import FetchStatus from '@/components/FetchStatus.jsx'
import { useGetEvent } from '@/hooks/events/useEventState'

export default function ChairPage() {
  const {
    data: eventData,
    isLoading: isEventLoading,
    error: eventError,
  } = useGetEvent()

  const tracks = useGetMyTracks(eventData?.roles)
  
  const tracksSettled = tracks.data ? tracks.data : eventData.tracks
  const [selectedTrack, setSelectedTrack] = useState(
    tracksSettled ? tracksSettled[0] : ''
  )

  const {
    data: works,
    isPending: isPendingWorks,
    error: errorWorks,
  } = useGetWorksByTrack(selectedTrack)

  useEffect(() => {
    if (tracksSettled && tracksSettled.length > 0) {
      setSelectedTrack(tracksSettled[0])
    }
  }, [tracksSettled])

  const component = (
    <Page
      tracks={tracksSettled || []}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      works={works || []}
    />
  )

  return (
    <FetchStatus
      component={component}
      isPending={tracks.isPending || isPendingWorks}
      error={tracks.error || errorWorks}
    />
  )
}
