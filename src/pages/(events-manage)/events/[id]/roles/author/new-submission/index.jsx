import { useNavigator } from "@/lib/navigation";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/state/events/newSubmissionSlice";
import SteppedForm from "@/components/SteppedForm";
import FormWorkData from "./form/FormWorkData";
import { useGetEvent } from "@/hooks/events/useEventState";
import { useNewSubmission } from "@/hooks/events/authorHooks";
import FormContentData from "./form/FormContentData";
import FormWorkPDF from "./form/FormWorkPDF";

export default function Page() {
  const navigator = useNavigator("/new-submission");
  const dispatch = useDispatch();
  const { data: eventData } = useGetEvent();
  const { mutateAsync: newSubmission, isPending, error } = useNewSubmission();

  const { title, keywords, track, abstract, pdfFile } = useSelector(
    (state) => state.newSubmission,
  );
  const booleanForSteps = [title && keywords && track, abstract, pdfFile];
  const stepsComponents = [
    <FormWorkData tracks={eventData.tracks || []} />,
    <FormContentData />,
    <FormWorkPDF />,
  ];

  async function onSave() {
    await newSubmission({
      submissionData: {
        title,
        keywords,
        track,
      },
    });
    dispatch(reset());
    navigator.back();
  }

  function onCancel() {
    dispatch(reset());
    navigator.back();
  }

  return (
    <SteppedForm
      title={"Nueva presentación de trabajo"}
      onSave={onSave}
      onCancel={onCancel}
      isSavePending={isPending}
      booleanForSteps={booleanForSteps}
      stepsComponents={stepsComponents}
    />
  );
}
