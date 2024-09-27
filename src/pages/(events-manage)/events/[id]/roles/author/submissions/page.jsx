import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import GoBackLink from "@/pages/(events-manage)/_components/GoBackLink";
import SubmissionInfo from "./_components/SubmissionInfo";
import Content from "./_components/Content";

export default function Page({ submissionData }) {
  return (
    <ContainerPage>
      <GoBackLink to={"/submissions"} text={"Volver a mis trabajos"} />
      <TitlePage title={submissionData.title} />
      <LineTabs
        tabs={[
          {
            label: "Información de presentación",
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
