import { useGetEvent } from "@/hooks/events/useEventState";
import Page from "./page";
import { useGetMyWorks } from "@/hooks/events/authorHooks";

export default function AuthorPage() {
  const { data: works, isPending, error } = useGetMyWorks();
  const { data: eventData } = useGetEvent();

  return <Page works={works || []} eventData={eventData || {}} />;
}
