import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "@formkit/tempo";
import TableHeaderTitle from "@/components/TableHeaderTitle";
import TableCursorRow from "@/components/TableCursorRow";
import TableContent from "@/components/TableContent";

export default function ReviewsTable({ reviews }) {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <div className="space-y-8">
      <CompletedReviews
        reviews={reviews}
        setSelectedReview={setSelectedReview}
      />
      <NonCompletedReviews reviews={reviews} />

      <Dialog
        open={selectedReview !== null}
        onOpenChange={() => setSelectedReview(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revisión de {selectedReview?.reviewer}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedReview?.reviewForm.map((item, index) => (
              <div key={index}>
                <h3 className="font-semibold">{item.title}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CompletedReviews({ reviews, setSelectedReview }) {
  return (
    <TableContent title={"Revisiones finalizadas"}>
      <Table>
        <TableHeaderTitle>
          <TableRow>
            <TableHead>Revisor</TableHead>
            <TableHead>Recomendación</TableHead>
            <TableHead>Fecha límite</TableHead>
          </TableRow>
        </TableHeaderTitle>
        <TableBody>
          {reviews.map((review, index) =>
            review.completed ? (
              <TableCursorRow
                key={index}
                onClick={() => review.completed && setSelectedReview(review)}
              >
                <TableCell>{review.reviewer}</TableCell>
                <TableCell>{review.status || "-"}</TableCell>
                <TableCell>
                  {format(new Date(review.deadlineDate), "long")}
                </TableCell>
              </TableCursorRow>
            ) : null,
          )}
        </TableBody>
      </Table>
    </TableContent>
  );
}

function NonCompletedReviews({ reviews }) {
  return (
    <TableContent title={"Revisiones pendientes"}>
      <Table>
        <TableHeaderTitle>
          <TableRow>
            <TableHead>Revisor</TableHead>
            <TableHead>Fecha límite</TableHead>
          </TableRow>
        </TableHeaderTitle>
        <TableBody>
          {reviews.map((review, index) =>
            !review.completed ? (
              <TableCursorRow
                key={index}
                onClick={() => review.completed && setSelectedReview(review)}
              >
                <TableCell>{review.reviewer}</TableCell>
                <TableCell>
                  {format(new Date(review.deadlineDate), "full")}
                </TableCell>
              </TableCursorRow>
            ) : null,
          )}
        </TableBody>
      </Table>
    </TableContent>
  );
}
