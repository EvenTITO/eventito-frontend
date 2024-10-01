import { useGetEvent } from '@/hooks/events/useEventState'
import Page from './page'
import { useGetWorksByTrack } from '@/hooks/events/chairHooks'
import { useState } from 'react'

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
