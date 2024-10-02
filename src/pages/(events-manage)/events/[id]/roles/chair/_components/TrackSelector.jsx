import SelectorList from '@/pages/_components/Wrappers/Selector/SelectorList'

export default function TrackSelector({
  tracks,
  selectedTrack,
  setSelectedTrack,
}) {
  if (tracks.length === 0) {
    return null
  }
  return (
    <div className="flex gap-2 items-center">
      <span>Track actual: </span>
      <SelectorList
        value={selectedTrack}
        onValueChange={(track) => setSelectedTrack(track)}
        placeholder={selectedTrack}
        label={'Elección de track'}
        items={tracks}
      />
    </div>
  )
}
