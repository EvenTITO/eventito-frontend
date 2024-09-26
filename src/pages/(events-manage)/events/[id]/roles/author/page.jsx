import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "@formkit/tempo";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORKS_STATUS_LABELS } from "@/lib/Constants";
import { useGetEvent } from "@/hooks/events/useEventState";
import { dateIsValid, getDeadlineSubmissions, getStartDate } from "@/lib/dates";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Autores</TableHead>
            <TableHead>Fecha límite</TableHead>
            <TableHead>Track</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {works.map((work) => (
            <TableRow
              key={work.id}
              onClick={() => handleRowClick(work)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell className="font-medium">{work.title}</TableCell>
              <TableCell>{work.authors.length}</TableCell>
              <TableCell>{format(work.deadlineDate, "long")}</TableCell>
              <TableCell>{work.track}</TableCell>
              <TableCell>{WORKS_STATUS_LABELS[work.status]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
