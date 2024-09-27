import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import Content from "./Content";
import GoBackLink from "@/pages/(events-manage)/_components/GoBackLink";
import SubmissionInfo from "./_components/SubmissionInfo";

export default function Page({ submissionData }) {
  return (
    <ContainerPage>
      <GoBackLink to={"/submissions"} text={"Volver a mis entregas"} />
      <TitlePage title={submissionData.title} />
      <LineTabs
        tabs={[
          {
            label: "Datos de entrega",
            component: <SubmissionInfo submissionData={submissionData} />,
          },
          {
            label: "Contenido",
            component: <Content submissionData={submissionData} />,
          },
        ]}
      />
    </ContainerPage>
  );
}
