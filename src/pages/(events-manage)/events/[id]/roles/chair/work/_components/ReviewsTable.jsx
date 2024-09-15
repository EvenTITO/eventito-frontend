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

export default function ReviewsTable({ reviews }) {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Revisor</TableHead>
            <TableHead>Recomendación</TableHead>
            <TableHead>Fecha límite</TableHead>
            <TableHead>Completado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review, index) => (
            <TableRow
              key={index}
              className={
                review.completed ? "cursor-pointer hover:bg-muted/50" : ""
              }
              onClick={() => review.completed && setSelectedReview(review)}
            >
              <TableCell>{review.reviewer}</TableCell>
              <TableCell>{review.status || "-"}</TableCell>
              <TableCell>
                {format(new Date(review.deadlineDate), "long")}
              </TableCell>
              <TableCell>
                {review.completed ? (
                  <span>Sí</span>
                ) : (
                  <span>No</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </>
  );
}
