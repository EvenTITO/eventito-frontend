import { useGetMyAssignments } from "@/services/api/events/reviewer/hooks";
import Page from "./page";

export default function ReviewerPage() {
  const { data: assignments } = useGetMyAssignments();

  return <Page assignments={assignments || []} />;
}
