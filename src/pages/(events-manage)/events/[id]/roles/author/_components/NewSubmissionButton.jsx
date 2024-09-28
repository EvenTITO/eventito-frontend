import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetEvent } from "@/hooks/events/useEventState";
import { dateIsValid, getDeadlineSubmissions } from "@/lib/dates";
import { useNavigator } from "@/lib/navigation";

export default function NewSubmissionButton() {
  const navigator = useNavigator();
  const { data: eventData } = useGetEvent();
  const deadlineSubmissions = getDeadlineSubmissions(eventData)?.date;

  function handleNewSubmission() {
    navigator.foward("new-work");
  }

  if (!dateIsValid(deadlineSubmissions)) {
    return null;
  }

  return (
    <Button onClick={handleNewSubmission}>
      <Plus className="mr-2 h-4 w-4" /> Nueva entrega
    </Button>
  );
}
