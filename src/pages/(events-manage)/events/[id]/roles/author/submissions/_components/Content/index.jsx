import { onSubmissionEditDay } from "../utils";
import EditableSubmission from "./EditableSubmission";
import ReadonlySubmission from "./ViewOnlySubmission";

export default function Content({ submissionData, onSubmit }) {
  const isEditable = onSubmissionEditDay(submissionData);

  return isEditable ? (
    <EditableSubmission submissionData={submissionData} onSubmit={onSubmit} />
  ) : (
    <ReadonlySubmission submissionData={submissionData} />
  );
}
