import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {
  useGetEventChairs,
  useGetEventChairsByTracks,
} from "@/hooks/manage/tracksHooks";
import { useGetEvent } from "@/hooks/events/useEventState";
import { unifyEventTracksWithChairs } from "./_components/utils";

export default function TracksConfigPage() {
  const eventData = useGetEvent();
  const chairsData = useGetEventChairs();

  const tracksSettled = eventData.data?.tracks;
  const chairsSettled = chairsData.data;

  const {
    data: tracksByChair,
    isPending,
    error,
  } = useGetEventChairsByTracks({
    enabled: !!tracksSettled && !!chairsSettled,
  });

  if (chairsData.data) {
    console.log("Chairs data", chairsData.data);
  }

  const component = (
    <Page
      tracks={unifyEventTracksWithChairs(
        eventData.data.tracks,
        tracksByChair || [],
      )}
      chairs={chairsData.data}
    />
  );
  return (
    <FetchStatus
      component={component}
      isPending={isPending || eventData.isPending || chairsData.isPending}
      error={error || eventData.error || chairsData.error}
    />
  );
}
