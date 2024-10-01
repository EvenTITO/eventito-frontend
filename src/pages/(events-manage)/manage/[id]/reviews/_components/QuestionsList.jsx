import QuestionCard from './QuestionCard'

export default function QuestionsList({
  questions,
  recommendation,
  handleUpdateQuestion,
  handleDeleteQuestion,
  isPending,
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
          isPending={isPending}
          canBeEdited={true}
          canBeDeleted={true}
        />
      ))}
      <QuestionCard
        question={recommendation}
        canBeEdited={false}
        canBeDeleted={false}
      />
    </div>
  )
}
