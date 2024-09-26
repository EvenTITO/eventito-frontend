import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetEvent } from "@/hooks/events/useEventState";
import { dateIsValid, getDeadlineSubmissions } from "@/lib/dates";
import WorksTable from "./_components/WorksTable";
import TableContent from "@/components/TableContent";

export default function Page({ works }) {
  const navigator = useNavigator();

  const handleRowClick = (work) => {
    const path = `submissions/${work.id}`;
    navigator.foward(path);
  };

  return (
    <ContainerPage>
      <TitlePage
        title={"Entregas de presentaciones"}
        rightComponent={<NewSubmissionButton />}
      />
      <TableContent title="Entregas a revisar">
        <WorksTable works={works} handleRowClick={handleRowClick} />
      </TableContent>
    </ContainerPage>
  );
}

function NewSubmissionButton() {
  const navigator = useNavigator();
  const { data: eventData } = useGetEvent();
  const deadlineSubmissions = getDeadlineSubmissions(eventData)?.date;

  function handleNewSubmission() {
    navigator.foward("new-submission");
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
