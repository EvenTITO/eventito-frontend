import React, { useState } from "react";
import { PlusIcon, Pencil, Trash2, GripVertical } from "lucide-react";
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

export default function QuestionCard({ question, onUpdate, onDelete }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(question);
  const [editingOptionIndex, setEditingOptionIndex] = useState(null);

  const handleSaveEdit = () => {
    onUpdate(editingQuestion);
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

  const handleAddOption = () => {
    setEditingQuestion({
      ...editingQuestion,
      options: [
        ...editingQuestion.options,
        `Option ${editingQuestion.options.length + 1}`,
      ],
    });
    setEditingOptionIndex(editingQuestion.options.length);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 relative">
      <div className="flex items-center mb-2">
        <div className="font-semibold text-lg flex-grow">{question.title}</div>
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
          <Button variant="table" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {question.type === "simple_question" && (
        <Textarea
          value={question.description || ""}
          readOnly
          className="mt-2 w-full"
          placeholder="Ingresar respuesta"
        />
      )}
      {question.type === "rating" && (
        <div className="flex items-center mt-2">
          <Slider
            defaultValue={[0]}
            max={question.max_value || 5}
            step={1}
            className="flex-grow mx-2"
          />
          <span className="ml-2">/ {question.max_value || 5}</span>
        </div>
      )}
      {question.type === "multiple_choice" && (
        <div className="mt-2 mx-4">
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-center mb-2 relative">
              <div className="w-6 h-6 rounded-full border border-gray-300 mr-2"></div>
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
            <PlusIcon className="h-4 w-4 mr-2" /> Add Option
          </Button>
        </div>
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingOptionIndex !== null ? "Edit Option" : "Edit Question"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {editingOptionIndex === null ? (
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editingQuestion.title}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="option">Option</Label>
                <Input
                  id="option"
                  value={editingQuestion.options[editingOptionIndex]}
                  onChange={(e) => handleUpdateOption(e.target.value)}
                />
              </div>
            )}
            {editingOptionIndex === null &&
              editingQuestion.type === "simple_question" && (
                <div>
                  <Label htmlFor="description">Description</Label>
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
              editingQuestion.type === "rating" && (
                <div>
                  <Label htmlFor="max-value">Max Value</Label>
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
          <Button onClick={handleSaveEdit}>Save Changes</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
