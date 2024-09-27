import { dateIsValid } from "@/lib/dates";

export function onSubmissionEditDay(submissionData) {
  const deadlineDate = submissionData?.deadline_date;
  return dateIsValid(null, deadlineDate);
}
