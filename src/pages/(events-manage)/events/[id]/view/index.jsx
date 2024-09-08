import { getEvent } from "@/services/api/events/general/hooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function EventViewPage() {
  const { isPending, error, data: eventInfo } = getEvent("f2c9f5d2-3941-491e-93fc-8de65163c1d2");

  const pageComponent = <Page eventInfo={eventInfo} />
  return (
    <FetchStatus isPending={isPending} error={error} component={pageComponent} />
  );
}
