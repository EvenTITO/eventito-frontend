import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetEvent } from "@/hooks/events/useEventState";

export default function PricingConfigPage() {
  const eventData = useGetEvent();

  if (eventData.data) {
    console.log("pricing", eventData.data.pricing);
  }

  const component = <Page prices={eventData.data?.pricing || []} />;
  return (
    <FetchStatus
      component={component}
      isPending={eventData.isPending}
      error={eventData.error}
    />
  );
}
