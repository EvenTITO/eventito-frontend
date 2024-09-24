import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddReviewerDialog from "./_components/AddReviewerDialog";
import ReviewsTable from "./_components/ReviewsTable";

export default function Reviews({ reviews, reviewers_pending}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center justify-between"}>
          <span>Listado de revisiones</span>
          <AddReviewerDialog />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReviewsTable reviews={reviews || []} reviewers_pending={reviewers_pending || []}/>
      </CardContent>
    </Card>
  );
}
