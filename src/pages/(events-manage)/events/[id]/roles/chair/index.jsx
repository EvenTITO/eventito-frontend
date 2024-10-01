import { useState } from 'react'
import { useGetEvent } from '@/hooks/events/useEventState'
import { useGetWorksByTrack } from '@/hooks/events/chairHooks'
import Page from './page'

export default function ChairPage() {
  const { data: tracks } = useGetEvent((data) => data.tracks)
  const [selectedTrack, setSelectedTrack] = useState(tracks[0] || [])

  const { data: works, isPending, error } = useGetWorksByTrack(selectedTrack)

  return (
    <Page
      tracks={tracks || []}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      works={works || []}
    />
  )
}
