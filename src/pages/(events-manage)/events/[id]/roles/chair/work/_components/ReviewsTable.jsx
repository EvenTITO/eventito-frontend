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
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "@formkit/tempo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import TableHeaderTitle from "@/components/TableHeaderTitle";
import TableCursorRow from "@/components/TableCursorRow";
import TableContent from "@/components/TableContent";

export default function ReviewsTable({
  reviews,
  onUpdateReview,
}) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [newDeadline, setNewDeadline] = useState(null);

  const handleUpdateDeadline = () => {
    if (selectedReviewer && newDeadline) {
      onUpdateReview(selectedReviewer.id, { deadlineDate: newDeadline });
      setSelectedReviewer(null);
      setNewDeadline(null);
    }
  };

  return (
    <div className="flex space-x-8">
      <div className="flex-grow space-y-8">
        <CompletedReviews
          reviews={reviews}
          setSelectedReview={setSelectedReview}
        />
      </div>
      <div className="w-1/3">
        <AllReviewers
          reviews={reviews}
          setSelectedReviewer={setSelectedReviewer}
        />
      </div>

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

      <Dialog
        open={selectedReviewer !== null}
        onOpenChange={() => {
          setSelectedReviewer(null);
          setNewDeadline(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Gestionar revisor: {selectedReviewer?.reviewer}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha límite actual
              </label>
              <p>
                {selectedReviewer &&
                  format(new Date(selectedReviewer.deadlineDate), "long")}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nueva fecha límite
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newDeadline ? (
                      format(newDeadline, "long")
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newDeadline}
                    onSelect={setNewDeadline}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedReviewer(null)}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateDeadline} disabled={!newDeadline}>
              Actualizar fecha límite
            </Button>
          </DialogFooter>
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

function AllReviewers({ reviews, setSelectedReviewer }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos los revisores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
              onClick={() => setSelectedReviewer(review)}
            >
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.reviewer}`}
                />
                <AvatarFallback>{review.reviewer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">{review.reviewer}</p>
                <p className="text-sm text-muted-foreground">
                  Fecha límite: {format(new Date(review.deadlineDate), "long")}
                </p>
              </div>
              <div
                className="w-3 h-3 rounded-full bg-green-500"
                style={{
                  backgroundColor: review.completed ? "green" : "orange",
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
