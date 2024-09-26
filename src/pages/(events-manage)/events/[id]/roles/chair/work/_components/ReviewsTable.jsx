import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableRow,} from "@/components/ui/table";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {format} from "@formkit/tempo";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import TableHeaderTitle from "@/components/TableHeaderTitle";
import TableCursorRow from "@/components/TableCursorRow";
import TableContent from "@/components/TableContent";
import {REVIEW_STATUS_LABELS} from "@/lib/Constants.js";

export default function ReviewsTable({reviews, reviewers, onUpdateReview}) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviewer, setSelectedReviewer] = useState(null);
  const [newDeadline, setNewDeadline] = useState(null);

  const handleUpdateDeadline = () => {
    if (selectedReviewer && newDeadline) {
      onUpdateReview(selectedReviewer.id, {deadlineDate: newDeadline});
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
          reviewers={reviewers || []}
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
                <h3 className="font-semibold">{item.question}</h3>
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
                    <CalendarIcon className="mr-2 h-4 w-4"/>
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

function CompletedReviews({reviews, setSelectedReview}) {
  return (
    <TableContent title={"Revisiones finalizadas"}>
      <Table>
        <TableHeaderTitle>
          <TableRow>
            <TableHead>Revisor</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead>Recomendación</TableHead>
            <TableHead>Fecha de revisión</TableHead>
          </TableRow>
        </TableHeaderTitle>
        <TableBody>
          {reviews.map((review, index) =>
              <TableCursorRow
                key={index}
                onClick={() => setSelectedReview(review)}
              >
                <TableCell>{review.reviewer}</TableCell>
                <TableCell>{review.submissionNumber + 1}</TableCell>
                <TableCell>{REVIEW_STATUS_LABELS[review.status]}</TableCell>
                <TableCell>
                  {format(new Date(review.creationDate), "long")}
                </TableCell>
              </TableCursorRow>
          )}
        </TableBody>
      </Table>
    </TableContent>
  );
}

function AllReviewers({reviewers, setSelectedReviewer}) {
  console.log('revieeeres', JSON.stringify(reviewers))
  return (
    <Card>
      <CardHeader>
        <CardTitle>Todos los revisores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviewers.map((reviewer, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
              onClick={() => setSelectedReviewer(reviewer)}
            >
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/6.x/initials/svg?seed=${reviewer.reviewer}`}
                />
                <AvatarFallback>{reviewer.reviewer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <p className="text-sm font-medium">{reviewer.reviewer}</p>
                <p className="text-sm text-muted-foreground">
                  Fecha límite: {format(new Date(reviewer.deadline), "long")}
                </p>
              </div>
              <div
                className="w-3 h-3 rounded-full bg-green-500"
                style={{
                  backgroundColor: reviewer.reviewAlreadySubmitted ? "green" : "orange",
                }}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
