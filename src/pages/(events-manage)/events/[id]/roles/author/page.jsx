import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import WorksTable from "./_components/WorksTable";
import TableContent from "@/components/TableContent";
import NewSubmissionButton from "./_components/NewSubmissionButton";

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
