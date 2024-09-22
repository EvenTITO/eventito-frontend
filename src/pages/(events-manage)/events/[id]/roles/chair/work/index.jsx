import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetWorkForAssignment } from "@/hooks/events/chairHooks";

export default function ChairWorkPage() {
  // TODO: cambiar esto para que sea global?
  const { data: selectedAssignment, isPending, error } = useGetWorkForAssignment();

  const component = <Page selectedAssignment={selectedAssignment} />;
  return <FetchStatus component={component} isPending={isPending} error={error} />;
}
