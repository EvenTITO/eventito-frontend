import QuestionCard from './QuestionCard'

export default function QuestionsList({
  questions,
  recommendation,
  handleUpdateQuestion,
  handleDeleteQuestion,
  isPending,
  handleSwapQuestions,
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
          onSwapUp={async () => await handleSwapQuestions(index, index - 1)}
          onSwapDown={async () => await handleSwapQuestions(index, index + 1)}
          isPending={isPending}
          canBeEdited={true}
          canBeDeleted={true}
          canBeMoved={true}
          canBeSwapedUp={index !== 0 && questions.length > 1}
          canBeSwapedDown={
            index !== questions.length - 1 && questions.length > 1
          }
        />
      ))}
      <QuestionCard
        question={recommendation}
        canBeEdited={false}
        canBeDeleted={false}
        canBeMoved={false}
      />
    </div>
  )
}
