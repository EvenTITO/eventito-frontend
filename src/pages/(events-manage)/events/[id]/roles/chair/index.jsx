import { useGetEvent } from "@/hooks/events/useEventState";
import Page from "./page";
import { useGetWorksByTrack } from "@/hooks/events/chairHooks";
import { useState } from "react";

export default function ChairPage() {
  const { data: eventData } = useGetEvent();
  const [selectedTrack, setSelectedTrack] = useState(
    eventData?.tracks[0] || "",
  );

  const { data: assignments, isPending, error } = useGetWorksByTrack(selectedTrack);
  if (error) {
    console.log('ocurrio un error');
    console.error(error);
  }

  return (
    <Page
      tracks={eventData?.tracks || []}
      selectedTrack={selectedTrack}
      setSelectedTrack={setSelectedTrack}
      assignments={assignments || []}
    />
  );
}
