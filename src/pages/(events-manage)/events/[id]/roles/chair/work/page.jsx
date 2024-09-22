import { ArrowLeft } from "lucide-react";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import { DetailsTab } from "./details";
import Reviews from "./reviews";
import StatusSelector from "./_components/StatusSelector";

export default function Page({ selectedAssignment, reviews }) {
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
        title={selectedAssignment.title}
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
                  selectedAssignment={selectedAssignment}
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
