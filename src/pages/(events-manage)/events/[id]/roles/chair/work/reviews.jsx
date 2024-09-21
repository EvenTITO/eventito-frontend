import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddReviewerDialog from "./_components/AddReviewerDialog";
import ReviewsTable from "./_components/ReviewsTable";
import { useParams } from "react-router-dom";
import { useGetReviews } from "@/services/api/events/chair/hooks";

export default function Reviews() {
  const { workId } = useParams();
  const { data: reviews } = useGetReviews(workId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center justify-between"}>
          <span>Listado de revisiones</span>
          <AddReviewerDialog />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReviewsTable reviews={reviews || []} />
      </CardContent>
    </Card>
  );
}
