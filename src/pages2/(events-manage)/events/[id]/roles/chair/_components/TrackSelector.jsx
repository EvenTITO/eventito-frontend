import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TrackSelector({ tracks, selectedTrack }) {
  return (
    <div className="flex gap-2 items-center">
      <span>Track actual: </span>
      <Select value={selectedTrack} onValueChange={(track) => alert(track)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectedTrack} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Elección de track</SelectLabel>
            {tracks.map((track) => (
              <SelectItem value={track}>{track}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}