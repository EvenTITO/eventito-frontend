import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {
  useGetReviewsForAssignment,
} from "@/hooks/events/chairHooks";
import { useGetWorkById, useGetWorkDownloadURL } from "@/hooks/events/worksHooks";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function ChairWorkPage() {
  // TODO: cambiar esto para que sea global?
  const workInfo = useGetWorkById();
  const reviews = useGetReviewsForAssignment();
  const {data: fileData, mutate: downloadWorkFile, isError, isPending, isSuccess, error} = useGetWorkDownloadURL();
  const { toast } = useToast();

  useEffect(() => {
    if (isPending) {
      console.log("loading...");
    }
    if (isError) {
      toast({
        variant: "destructiveOutline",
        title: "Error al descargar trabajo",
        description: "El autor no ha subido un archivo todavia",
      });
    }
    if (isSuccess) {
      window.open(fileData.download_url.download_url, "_blank");
    }
  }, [isPending, isError, isSuccess, toast]);

  const component = (
    <Page selectedWork={workInfo.data} reviews={reviews.data} getFileData={downloadWorkFile} />
  );
  return (
    <FetchStatus
      component={component}
      isPending={workInfo.isPending || reviews.isPending}
      error={workInfo.error || reviews.error}
    />
  );
}
