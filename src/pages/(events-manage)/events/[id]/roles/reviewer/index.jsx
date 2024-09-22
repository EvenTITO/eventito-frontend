import { useGetMyAssignments } from "@/hooks/events/reviewerHooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function ReviewerPage() {
  const { data: assignments, isPending, error } = useGetMyAssignments();

  const component = <Page assignments={assignments} />;

  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
