import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetEventChairsByTracks } from "@/hooks/manage/tracksHooks";
import { useGetEvent } from "@/hooks/events/useEventState";

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

  if (tracksByChair) {
    console.log("tracks by chair", tracksByChair);
    console.log("tracks", eventData.data.tracks);
  }

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

function unifyEventTracksWithChairs(eventTracks, tracksByChair) {
  eventTracks.forEach((trackName) => {
    const trackExists = tracksByChair.some(
      (track) => track.track === trackName,
    );
    if (!trackExists) {
      tracksByChair.push({ track: trackName });
    }
  });

  return tracksByChair;
}
