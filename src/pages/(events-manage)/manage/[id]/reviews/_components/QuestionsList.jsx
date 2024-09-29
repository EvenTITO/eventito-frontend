import QuestionCard from "./QuestionCard";

export default function QuestionsList({
  questions,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onUpdate={handleUpdateQuestion}
          onDelete={() => handleDeleteQuestion(question.id)}
        />
      ))}
    </div>
  );
}
