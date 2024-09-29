import React, { useState } from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import QuestionsList from "./_components/QuestionsList";
import AddQuestion from "./_components/AddQuestion";
import AddQuestionDetails from "./_components/AddQuestionDetails";
import { useAddQuestion } from "@/hooks/manage/reviewsHooks";

export default function Page({ reviewSkeleton }) {
  const [questions, setQuestions] = useState(reviewSkeleton);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [newQuestionType, setNewQuestionType] = useState(null);
  const [newQuestion, setNewQuestion] = useState(null);

  const { mutateAsync: addNewQuestion, isPending, error } = useAddQuestion();

  const handleAddQuestion = (type) => {
    setNewQuestionType(type);
    setNewQuestion({
      id: Date.now().toString(),
      type,
      question: "",
      max_value: type === "rating" ? 5 : undefined,
      options: type === "multiple_choice" ? ["Opción"] : undefined,
      more_than_one_answer_allowed:
        type === "multiple_choice" ? false : undefined,
    });
    setIsAddDialogOpen(false);
    setIsDetailsDialogOpen(true);
  };

  const handleSaveNewQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setIsDetailsDialogOpen(false);
    setNewQuestion(null);
    setNewQuestionType(null);
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)),
    );
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <ContainerPage>
      <TitlePage title={"Configuración de formulario de revisión"} />

      <QuestionsList
        questions={questions}
        handleUpdateQuestion={handleUpdateQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
      />
      <AddQuestion
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        handleAddQuestion={handleAddQuestion}
      />
      <AddQuestionDetails
        isDetailsDialogOpen={isDetailsDialogOpen}
        setIsDetailsDialogOpen={setIsDetailsDialogOpen}
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        newQuestionType={newQuestionType}
        handleSaveNewQuestion={handleSaveNewQuestion}
      />
    </ContainerPage>
  );
}
