import LineTabs from "@/components/LineTabs";
import { Button } from "@/components/ui/button";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import Content from "./Content";
import Members from "./Members";
import GoBackLink from "@/pages/(events-manage)/_components/GoBackLink";

export default function NewSubmissionPage() {
  return (
    <ContainerPage>
      <GoBackLink to={"/new-submission"} text={"Volver a mis entregas"} />
      <TitlePage
        title={"Nueva entrega"}
        rightComponent={<Button disabled>Finalizar entrega</Button>}
      />
      <LineTabs
        tabs={[
          { label: "Contenido", component: <Content /> },
          { label: "Miembros", component: <Members /> },
        ]}
      />
    </ContainerPage>
  );
}
