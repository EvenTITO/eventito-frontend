import QuestionCard from "./QuestionCard";

export default function QuestionsList({
  questions,
  handleUpdateQuestion,
  handleDeleteQuestion,
}) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          questionIndex={index}
          question={question}
          onUpdate={handleUpdateQuestion}
          onDelete={handleDeleteQuestion}
        />
      ))}
    </div>
  );
}
