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
import { Check, X } from "lucide-react";

export default function Reviews() {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Revisor</TableHead>
            <TableHead>Completado</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha límite</TableHead>
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
              <TableCell>
                {review.completed ? (
                  <Check className="text-green-500" />
                ) : (
                  <X className="text-red-500" />
                )}
              </TableCell>
              <TableCell>{review.status || "Pendiente"}</TableCell>
              <TableCell>
                {format(new Date(review.deadlineDate), "long")}
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
    </div>
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
