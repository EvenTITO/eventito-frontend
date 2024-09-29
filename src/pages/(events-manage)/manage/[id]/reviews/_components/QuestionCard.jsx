import { useState } from "react";
import { PlusIcon, Pencil, Trash2, ChevronRight } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import ButtonWithLoading from "@/components/ButtonWithLoading";

export default function QuestionCard({
  questionIndex,
  question,
  onUpdate,
  onDelete,
  isPending,
}) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(question);
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);

  const handleSaveEdit = async () => {
    await onUpdate({ updatedQuestion: editingQuestion, index: questionIndex });
    setIsEditDialogOpen(false);
    setEditingOptionIndex(null);
  };

  const handleEditOption = (index) => {
    setEditingOptionIndex(index);
    setIsEditDialogOpen(true);
  };

  const handleUpdateOption = (value) => {
    const newOptions = [...editingQuestion.options];
    newOptions[editingOptionIndex] = value;
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions,
    });
  };

  const handleDelete = async () => {
    await onDelete(question, questionIndex);
  };

  const handleAddOption = () => {
    setEditingQuestion({
      ...editingQuestion,
      options: [...editingQuestion.options, "Nueva opción"],
    });
    setEditingOptionIndex(editingQuestion.options.length);
    setIsEditDialogOpen(true);
  };

  let title = question.question;
  title +=
    question.type_question === "multiple_choice"
      ? question.more_than_one_answer_allowed
        ? " (múltiples opciones)"
        : " (opción única)"
      : "";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 relative">
      <div className="flex items-center mb-2">
        <div className="font-semibold text-lg flex-grow">
          {title}{" "}
          {question.is_mandatory ? (
            <span className="text-red-600">*</span>
          ) : null}
        </div>
        <div className="flex items-center">
          <Button
            variant="table"
            size="sm"
            onClick={() => {
              setEditingOptionIndex(null);
              setIsEditDialogOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="table" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {question.type_question === "simple_question" && (
        <Textarea
          value={question.description || ""}
          readOnly
          className="mt-2 w-full"
          placeholder="Ingresar respuesta"
        />
      )}
      {question.type_question === "rating" && (
        <div className="flex items-center mt-2">
          <Slider
            defaultValue={[0]}
            max={question.max_value || 5}
            step={1}
            className="flex-grow mx-2"
          />
          <span className="ml-2"> {question.max_value || 5}</span>
        </div>
      )}
      {question.type_question === "multiple_choice" && (
        <div className="mt-2 mx-4">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center mb-2 relative">
              <ChevronRight className="w-4 h-4  mr-2" />
              <div className="flex-grow">{option}</div>
              <Button
                variant="table"
                size="sm"
                onClick={() => handleEditOption(index)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="table"
                size="sm"
                onClick={() => {
                  const newOptions = question.options.filter(
                    (_, i) => i !== index,
                  );
                  onUpdate({ ...question, options: newOptions });
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddOption}
            className="mt-2"
          >
            <PlusIcon className="h-4 w-4 mr-2" /> Agregar opción
          </Button>
        </div>
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOptionIndex !== null
                ? "Editar opción"
                : "Editar pregunta"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editingOptionIndex === null ? (
              <div>
                <Label htmlFor="question">Título de pregunta</Label>
                <Input
                  id="question"
                  value={editingQuestion.question}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      question: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="option">Nombre de la opción</Label>
                <Input
                  id="option"
                  value={editingQuestion.options[editingOptionIndex]}
                  onChange={(e) => handleUpdateOption(e.target.value)}
                />
              </div>
            )}
            {editingOptionIndex === null &&
              editingQuestion.type_question === "simple_question" && (
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={editingQuestion.description || ""}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              )}
            {editingOptionIndex === null &&
              editingQuestion.type_question === "rating" && (
                <div>
                  <Label htmlFor="max-value">Máxima calificación</Label>
                  <Input
                    id="max-value"
                    type="number"
                    value={editingQuestion.max_value || 5}
                    onChange={(e) =>
                      setEditingQuestion({
                        ...editingQuestion,
                        max_value: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              )}
          </div>
          <ButtonWithLoading onClick={handleSaveEdit} isLoading={isPending}>
            Guardar
          </ButtonWithLoading>
        </DialogContent>
      </Dialog>
    </div>
  );
}
