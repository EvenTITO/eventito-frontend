import Page from "./page";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";

export default function EventViewPage() {
  const { data: eventInfo, isPending, error } = useGetEvent();

  if (eventInfo) {
    console.log("eventInfo", eventInfo);
  }

  const pageComponent = <Page eventInfo={eventInfo} />;
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  );
}
