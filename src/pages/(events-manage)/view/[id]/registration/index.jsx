import { useGetEvent } from "@/hooks/events/useEventState";
import FetchStatus from "@/components/FetchStatus";
import Page from "./page";

export default function Registration() {
  const { data: event, isPending, error } = useGetEvent();

  const component = <Page event={event} />;
  if (event) {
    console.log("pricing", event.pricing);
  }

  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
