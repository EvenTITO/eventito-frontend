import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddQuestion({
  isAddDialogOpen,
  setIsAddDialogOpen,
  handleAddQuestion,
}) {
  const questionItems = [
    { label: "Pregunta a desarrollar", type_question: "simple_question" },
    { label: "Calificación", type_question: "rating" },
    {
      label: "Múltiple choice (opción única)",
      type_question: "multiple_choice",
    },
    {
      label: "Múltiple choice (múltiples opciones)",
      type_question: "multiple_choice",
    },
  ];

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          <PlusIcon className="mr-2 h-4 w-4" /> Nueva pregunta
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Seleccionar un tipo de pregunta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {questionItems.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() =>
                handleAddQuestion(question.type_question)
              }
            >
              {question.label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
