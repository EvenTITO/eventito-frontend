import { useGetEvent } from "@/hooks/events/useEventState";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function EventViewPage() {
  const { data: event, isPending, error } = useGetEvent();

  const component = <Page event={event} />;

  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
