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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "@formkit/tempo";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Reviews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center justify-between"}>
          <span>Listado de revisiones</span>
          <Button>Agregar revisor</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReviewsTable reviews={reviews} />
      </CardContent>
    </Card>
  );
}

function ReviewsTable({ reviews }) {
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
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
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

const reviewForm = [
  {
    title: "Calificación general",
    answer: 8,
  },
  {
    title: "Recomendación",
    answer: "Aceptado",
  },
  {
    title: "Área de mejora",
    answer: "Ninguna",
  },
  {
    title: "Comentarios a los autores",
    answer:
      "Muy buen trabajo general, revisar que todas las imágenes tengan el mismo tamaño para el momento de la presentación.",
  },
];

const reviews = [
  {
    reviewer: "Gonzalo Sabatino",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "Aceptado",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Fernando Sinisi",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "A revisión",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Lucas Verón",
    completed: false,
    deadlineDate: "2024/09/20",
    status: null,
    reviewForm: null,
  },
];
