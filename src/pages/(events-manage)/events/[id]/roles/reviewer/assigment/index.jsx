import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetWorkById} from "@/hooks/events/worksHooks";
import {useGetEvent} from "@/hooks/events/useEventState.js";

export default function AssignmentPage() {
  const {isPending, error, data: selectedWork} = useGetWorkById();
  const { data: eventData } = useGetEvent();

  const pageComponent = (
    <Page selectedWork={selectedWork} questions={eventData.review_skeleton.questions}/>
  );
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  );
}

const reviewSkeleton = [
  {
    title: "Calificación general",
    description: "",
    type: "rating",
    maxValue: 10,
  },
  {
    title: "Recomendación",
    description: "¿Cuál es tu recomendación para el estado del trabajo?",
    type: "singleChoice",
    options: ["Aceptado", "A revisión", "Rechazado"],
  },
  {
    title: "Área de mejora",
    description:
      "En caso de necesitarlo, indicar las áreas de mejora del trabajo.",
    type: "multipleChoice",
    options: ["Abstract", "Mejorar redacción", "Imágenes"],
  },
  {
    title: "Comentarios a los autores",
    description:
      "Realizar una crítica constructiva que será pública para los autores.",
    type: "text",
  },
];
