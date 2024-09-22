import { Navigate, useParams } from "react-router-dom";

export default function OrganizerDummyPage() {
  const { id } = useParams();

  return <Navigate to={`manage/${id}/general`} replace />;
}
