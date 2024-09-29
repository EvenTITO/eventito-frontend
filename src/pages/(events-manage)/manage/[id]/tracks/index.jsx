import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetEventChairsByTracks } from "@/hooks/manage/tracksHooks";
import { useGetEvent } from "@/hooks/events/useEventState";
import { unifyEventTracksWithChairs } from "./_components/utils";

export default function TracksConfigPage() {
  const eventData = useGetEvent();
  const tracksSettled = eventData.data?.tracks;

  const {
    data: tracksByChair,
    isPending,
    error,
  } = useGetEventChairsByTracks({
    enabled: !!tracksSettled,
  });

  const component = (
    <Page
      tracks={unifyEventTracksWithChairs(
        eventData.data.tracks,
        tracksByChair || [],
      )}
    />
  );
  return (
    <FetchStatus
      component={component}
      isPending={isPending || eventData.isPending}
      error={error || eventData.error}
    />
  );
}
