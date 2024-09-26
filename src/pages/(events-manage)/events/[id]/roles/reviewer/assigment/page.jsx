import React, {useEffect} from "react";
import {ArrowLeft} from "lucide-react";
import LineTabs from "@/components/LineTabs";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import {useNavigator} from "@/lib/navigation";
import {ReviewerForm} from "./reviewForm";
import {useGetWorkDownloadURL} from "@/hooks/events/worksHooks.js";
import { useToast } from "@/hooks/use-toast";
import {DetailsTab} from "./details.jsx";

export default function Page({selectedWork, questions}) {
  const navigator = useNavigator("/assignments");
  const {
    data: fileData,
    mutate: downloadWorkFile,
    isError,
    isPending,
    isSuccess,
  } = useGetWorkDownloadURL();
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

  function handleBack() {
    navigator.back();
  }

  return (
    <ContainerPage>
      <a
        href="#"
        onClick={handleBack}
        className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4"/> Volver a asignaciones
      </a>
      <TitlePage title={selectedWork.title}/>

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
              label: "Formulario",
              component: <ReviewerForm handleBack={handleBack} questions={questions}/>,
            },
          ]}
        />
      </div>
    </ContainerPage>
  );
}
