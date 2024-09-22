import { useState } from "react";
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
import { useSubmitReview } from "@/hooks/events/reviewerHooks";
import ButtonWithLoading from "@/components/ButtonWithLoading";

export function ReviewerForm({ handleBack, questions }) {
  const [review, setReview] = useState({});
  const { mutateAsync: submitReview, isPending } = useSubmitReview();

  const handleReviewChange = (field, value) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitReview = async () => {
    await submitReview({ review });
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
        <ButtonWithLoading
          onClick={handleSubmitReview}
          isLoading={isPending}
          className="w-full"
          text="Finalizar revisión"
        />
      </CardFooter>
    </Card>
  );
}
