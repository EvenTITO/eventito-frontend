import FetchStatus from '@/components/FetchStatus.jsx'
import Page from './page'
import { useEvent } from '@/lib/layout'
import { useGetMyTracks, useGetWorksByTrack } from '@/hooks/events/chairHooks'
import { useState } from 'react'

export default function ChairPage() {
  const eventData = useEvent()
  const tracks = useGetMyTracks(eventData?.roles)

  const tracksSettled = tracks.data ? tracks.data : eventData.tracks
  const [selectedTrack, setSelectedTrack] = useState(
    tracksSettled ? tracksSettled[0] : ''
  )

  const {
    data: works,
    isPending: isPendingWorks,
    error: errorWorks,
  } = useGetWorksByTrack(tracksSettled, selectedTrack)

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
