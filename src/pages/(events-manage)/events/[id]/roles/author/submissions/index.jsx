import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import Content from "./Content";
import Members from "../_components/Members";
import GoBackLink from "@/pages/(events-manage)/_components/GoBackLink";
import SubmissionInfo from "./_components/SubmissionInfo";

export default function ViewSubmissionPage() {
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
          {
            label: "Miembros",
            component: <Members authorList={submissionData.authors} />,
          },
        ]}
      />
    </ContainerPage>
  );
}

const submissionData = {
  title: "Trabajo de quimica",
  abstract: "Trabajo abstract",
  authors: [
    {
      username: "Gonzalo Sabatino",
      email: "gsabatino@fi.uba.ar",
      isSpeaker: false,
      affiliation: "FIUBA",
    },
    {
      username: "Lucas Veron",
      email: "lveron@fi.uba.ar",
      isSpeaker: false,
      affiliation: "FIUBA",
    },
    {
      username: "Fernando Sinisi",
      email: "fsinisi@fi.uba.ar",
      isSpeaker: true,
      affiliation: "FIUBA",
    },
    {
      username: "Mateo Capon",
      email: "mcapon@fi.uba.ar",
      isSpeaker: false,
      affiliation: "FIUBA",
    },
  ],
  track: "Quimica",
  keywords: ["IA", "Python"],
  deadline_date: "2024-09-26T23:43:00.573Z",
  creation_date: "2024-09-26T23:43:00.573Z",
  last_update: "2024-09-26T23:43:00.573Z",
};
