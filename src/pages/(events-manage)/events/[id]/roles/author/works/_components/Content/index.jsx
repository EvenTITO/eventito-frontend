import { onWorkEditDay } from "../utils";
import EditableSubmission from "./EditableSubmission";
import ReadonlySubmission from "./ViewOnlySubmission";

export default function Content({ submissionData }) {
  const isEditable = onWorkEditDay(submissionData);

  return isEditable ? (
    <EditableSubmission submissionData={submissionData} />
  ) : (
    <ReadonlySubmission submissionData={submissionData} />
  );
}
