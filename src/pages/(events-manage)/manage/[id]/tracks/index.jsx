import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetEventChairsByTracks } from "@/hooks/manage/tracksHooks";

export default function TracksConfigPage() {
  const { data: tracksByChair, isPending, error } = useGetEventChairsByTracks();

  if (tracksByChair) {
    console.log("tracks by chair", tracksByChair);
  }

  const component = <Page tracks={tracksByChair || []} />;
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
