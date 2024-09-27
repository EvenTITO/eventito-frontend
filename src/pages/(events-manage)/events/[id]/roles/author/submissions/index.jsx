import { useGetMySubmission } from "@/hooks/events/authorHooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function ViewSubmissionPage() {
  const { data: submissionData, isPending, error } = useGetMySubmission();

  const component = <Page submissionData={submissionData} />;
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  );
}
