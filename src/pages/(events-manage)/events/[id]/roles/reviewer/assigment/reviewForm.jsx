import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Rating from "./_components/Rating";
import SingleChoice from "./_components/SingleChoice";
import MultipleChoice from "./_components/MultipleChoice";
import TextInput from "./_components/TextInput";

export function ReviewerForm({ handleBack }) {
  const [review, setReview] = useState({});

  const handleReviewChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReview = () => {
    console.log("Submitting review:", review);
    handleBack();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulario de reivisión</CardTitle>
        <CardDescription>
          Para terminar con la revisión, deben completarse las siguientes
          preguntas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-lg font-semibold">{question.title}</Label>
            <p className="text-sm text-gray-600 mb-2">{question.description}</p>
            {question.type === "rating" && (
              <Rating
                value={review[question.title] || 0}
                onChange={(value) => handleReviewChange(question.title, value)}
                max={question.maxValue}
              />
            )}
            {question.type === "singleChoice" && question.options && (
              <SingleChoice
                options={question.options}
                value={review[question.title] || ""}
                onChange={(value) => handleReviewChange(question.title, value)}
              />
            )}
            {question.type === "multipleChoice" && question.options && (
              <MultipleChoice
                options={question.options}
                value={review[question.title] || []}
                onChange={(value) => handleReviewChange(question.title, value)}
              />
            )}
            {question.type === "text" && (
              <TextInput
                value={review[question.title] || ""}
                onChange={(value) => handleReviewChange(question.title, value)}
                placeholder="Enter your response here"
              />
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmitReview} className="w-full">
          Submit Review
        </Button>
      </CardFooter>
    </Card>
  );
}

const questions = [
  {
    title: "Calificación general",
    description: "",
    type: "rating",
    maxValue: 10,
  },
  {
    title: "Recomendación",
    description: "¿Cuál es tu recomendación para el estado del trabajo?",
    type: "singleChoice",
    options: ["Aceptado", "A revisión", "Rechazado"],
  },
  {
    title: "Área de mejora",
    description:
      "En caso de necesitarlo, indicar las áreas de mejora del trabajo.",
    type: "multipleChoice",
    options: ["Abstract", "Mejorar redacción", "Imágenes"],
  },
  {
    title: "Comentarios a los autores",
    description:
      "Realizar una crítica constructiva que será pública para los autores.",
    type: "text",
  },
];
