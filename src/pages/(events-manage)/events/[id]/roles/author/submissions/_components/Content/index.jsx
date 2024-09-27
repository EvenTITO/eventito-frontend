import { onSubmissionEditDay } from "../utils";
import EditableSubmission from "./EditableSubmission";
import ReadonlySubmission from "./ViewOnlySubmission";

export default function Content({ submissionData }) {
  const isEditable = onSubmissionEditDay(submissionData);

  return isEditable ? (
    <EditableSubmission submissionData={submissionData} />
  ) : (
    <ReadonlySubmission submissionData={submissionData} />
  );
}
