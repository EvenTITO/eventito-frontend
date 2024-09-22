import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useGetWorkById } from "@/hooks/events/worksHooks";

export default function AssignmentPage() {
  const {
    isPending,
    error,
    data: selectedAssignment,
  } = useGetWorkById();

  const pageComponent = (
    <Page selectedAssignment={selectedAssignment} questions={reviewSkeleton} />
  );
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={pageComponent}
    />
  );
}

// TODO: consumirlo desde el evento
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
