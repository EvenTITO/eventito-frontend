import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import { useParams } from "react-router-dom";
import { getAssignmentInfo } from "@/services/api/events/reviewer/hooks";

export default function AssignmentPage() {
  // TODO: cambiar esto para que sea global?
  const { assignmentId } = useParams();

  const {
    isPending,
    error,
    data: selectedAssignment,
  } = getAssignmentInfo(assignmentId);

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

// TODO: consumirlo desde redux -> en el get del evento lo estoy obteniendo
// ojo con los tipos
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
