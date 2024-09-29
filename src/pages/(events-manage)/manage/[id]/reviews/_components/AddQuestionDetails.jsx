import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddQuestionDetails({
  isDetailsDialogOpen,
  setIsDetailsDialogOpen,
  newQuestion,
  setNewQuestion,
  newQuestionType,
  handleSaveNewQuestion,
}) {
  return (
    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configuración de pregunta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="new-title">Título</Label>
            <Input
              id="new-title"
              value={newQuestion?.title || ""}
              onChange={(e) =>
                setNewQuestion({ ...newQuestion, title: e.target.value })
              }
            />
          </div>
          {newQuestionType === "simple_question" && (
            <div>
              <Label htmlFor="new-description">Descripción</Label>
              <Textarea
                id="new-description"
                value={newQuestion?.description || ""}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    description: e.target.value,
                  })
                }
              />
            </div>
          )}
          {newQuestionType === "rating" && (
            <div>
              <Label htmlFor="new-max-value">Máximo valor</Label>
              <Input
                id="new-max-value"
                type="number"
                value={newQuestion?.max_value || 5}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    max_value: parseInt(e.target.value),
                  })
                }
              />
            </div>
          )}
        </div>
        <Button onClick={handleSaveNewQuestion}>Guardar</Button>
      </DialogContent>
    </Dialog>
  );
}
