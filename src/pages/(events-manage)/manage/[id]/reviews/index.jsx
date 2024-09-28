import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";
import Page from "./page";

export default function ReviewsConfigPage() {
  const { data: eventData, isPending, error } = useGetEvent();

  if (eventData) {
    console.log(eventData.review_skeleton);
  }

  const component = <Page questions={eventData.review_skeleton} />;
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
