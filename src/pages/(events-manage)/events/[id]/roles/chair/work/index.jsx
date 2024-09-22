import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetWorkForAssignment } from "@/hooks/events/chairHooks";

export default function ChairWorkPage() {
  // TODO: cambiar esto para que sea global?
  const assignmentInfo = useGetWorkForAssignment();

  const component = <Page selectedAssignment={assignmentInfo.data} />;
  return (
    <FetchStatus
      component={component}
      isPending={assignmentInfo.isPending}
      error={assignmentInfo.error}
    />
  );
}
