import { ArrowLeft } from "lucide-react";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import { DetailsTab } from "./details";
import Reviews from "./reviews";
import StatusSelector from "./_components/StatusSelector";

export default function Page({ selectedWork, reviews, getFileData }) {
  const navigator = useNavigator("/works");

  function handleBack(e) {
    e.preventDefault();
    navigator.back();
  }

  return (
    <ContainerPage>
      <a
        href="#"
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a tracks
      </a>
      <TitlePage
        title={selectedWork.title}
        rightComponent={<StatusSelector />}
      />

      <div className="mb-6">
        <LineTabs
          tabs={[
            {
              label: "Entrega",
              component: (
                <DetailsTab
                  handleBack={handleBack}
                  selectedWork={selectedWork}
                  getFileData={getFileData}
                />
              ),
            },
            {
              label: "Revisiones",
              component: <Reviews reviews={reviews} />,
            },
          ]}
        />
      </div>
    </ContainerPage>
  );
}
