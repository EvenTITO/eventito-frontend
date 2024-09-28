import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";

export default function Page({ questions }) {
  return (
    <ContainerPage>
      <TitlePage title={"Administración de formulario de revisión"} />
      <div className="space-y-6 pt-6">Form de revisión</div>
    </ContainerPage>
  );
}
