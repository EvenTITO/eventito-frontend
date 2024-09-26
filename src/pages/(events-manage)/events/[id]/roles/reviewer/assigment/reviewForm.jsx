import {useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import Rating from "./_components/Rating";
import SingleChoice from "./_components/SingleChoice";
import MultipleChoice from "./_components/MultipleChoice";
import TextInput from "./_components/TextInput";
import {useSubmitReview} from "@/hooks/events/reviewerHooks";
import ButtonWithLoading from "@/components/ButtonWithLoading";

export function ReviewerForm({handleBack, questions}) {
  const [review, setReview] = useState(questions);
  const {mutateAsync: submitReview, isPending} = useSubmitReview();

  const handleReviewChange = (questionIndex, answer) => {
    setReview((prevReview) => {
      const newReview = [...prevReview];
      newReview[questionIndex]["answer"] = answer;
      return newReview;
    });
  };

  const handleSubmitReview = async () => {
    await submitReview({review});
    handleBack();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Formulario de revisión</CardTitle>
        <CardDescription>
          Para terminar con la revisión, deben completarse las siguientes
          preguntas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="space-y-2">
            <Label className="text-lg font-semibold">{question.question}</Label>
            {question.type_question === "rating" && (
              <Rating
                value={review[index]["answer"] || 0}
                onChange={(value) => handleReviewChange(index, value)}
                max={question.max_value}
              />
            )}
            {question.type_question === "multiple_choice" && question.options && !question.more_than_one_answer_allowed && (
              <SingleChoice
                options={question.options}
                value={review[index]["answer"]? review[index]["answer"][0] : ""}
                onChange={(value) => handleReviewChange(index, [value])}
              />
            )}
            {question.type_question === "multiple_choice" && question.options && question.more_than_one_answer_allowed && (
              <MultipleChoice
                options={question.options}
                value={review[index]["answer"] || []}
                onChange={(value) => handleReviewChange(index, value)}
              />
            )}
            {question.type_question === "simple_question" && (
              <TextInput
                value={review[index]["answer"] || ""}
                onChange={(value) => handleReviewChange(index, value)}
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
