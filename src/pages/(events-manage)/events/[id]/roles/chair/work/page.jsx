import { ArrowLeft } from "lucide-react";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import { DetailsTab } from "./details";
import Reviews from "./reviews";
import StatusSelector from "./_components/StatusSelector";
import { useGetWorkDownloadURL } from "@/hooks/events/worksHooks";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { useSubmitChairReview } from "@/hooks/events/chairHooks";

export default function Page({ selectedWork, reviews, reviewers}) {
  const navigator = useNavigator("/works");
  const {
    data: fileData,
    mutate: downloadWorkFile,
    isError,
    isPending,
    isSuccess,
  } = useGetWorkDownloadURL();
  const chairReview = useSubmitChairReview();
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructiveOutline",
        title: "Error al descargar trabajo",
        description: "El autor no ha subido un archivo todavia",
      });
    } else if (isSuccess) {
      window.open(fileData.download_url.download_url, "_blank");
    }
  }, [isError, isSuccess, toast]);

  function handleBack(e) {
    e.preventDefault();
    navigator.back();
  }

  function onSubmit() {
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
        rightComponent={
          <StatusSelector
            submitChairReview={chairReview.mutateAsync}
            isPending={chairReview.isPending}
            onSubmit={onSubmit}
          />
        }
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
                  getFileData={downloadWorkFile}
                  isPending={isPending}
                />
              ),
            },
            {
              label: "Revisiones",
              component: <Reviews reviews={reviews} reviewers={reviewers} />,
            },
          ]}
        />
      </div>
    </ContainerPage>
  );
}
