import Page from "./page";
import FetchStatus from "@/components/FetchStatus";
import {useGetEvent} from "@/hooks/events/useEventState";

export default function GeneralConfigPage() {
  const {data: eventInfo, isPending, error} = useGetEvent();

  const pageComponent = <Page eventInfo={eventInfo}/>;
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  );
}
