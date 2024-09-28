import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import GoBackLink from "@/pages/(events-manage)/_components/GoBackLink";
import WorkInfo from "./_components/WorkInfo.jsx";
import Content from "./_components/Content";

export default function Page({ workData }) {
  return (
    <ContainerPage>
      <GoBackLink to={"/works"} text={"Volver a mis trabajos"} />
      <TitlePage title={workData.title} />
      <LineTabs
        tabs={[
          {
            label: "Información de presentación",
            component: <WorkInfo workData={workData} />,
          },
          {
            label: "Contenido",
            component: <Content submissionData={workData} />,
          },
        ]}
      />
    </ContainerPage>
  );
}
