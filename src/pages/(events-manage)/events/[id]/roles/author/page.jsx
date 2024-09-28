import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import WorksTable from "./_components/WorksTable";
import TableContent from "@/components/TableContent";
import NewSubmissionButton from "./_components/NewSubmissionButton";

export default function Page({ works, eventData }) {
  const navigator = useNavigator();

  const handleRowClick = (work) => {
    const path = `works/${work.id}`;
    navigator.foward(path);
  };

  return (
    <ContainerPage>
      <TitlePage
        title={`Trabajos presentados en ${eventData?.title}`}
        rightComponent={<NewSubmissionButton />}
      />
      <TableContent title="Mis entregas">
        <WorksTable works={works} handleRowClick={handleRowClick} />
      </TableContent>
    </ContainerPage>
  );
}
