import Page from "./page";
import { useGetAssignments } from "@/services/api/events/chair/hooks";

export default function ChairPage() {
  const { data: assignments } = useGetAssignments(selectedTrack);

  return (
    <Page
      tracks={tracks}
      selectedTrack={selectedTrack}
      assignments={assignments || []}
    />
  );
}

const tracks = ["Química", "IA", "Python"];
const selectedTrack = "IA";
