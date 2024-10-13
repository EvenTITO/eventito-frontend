import React, { useState } from 'react'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import QuestionsList from './_components/QuestionsList'
import AddQuestion from './_components/AddQuestion'
import AddQuestionDetails from './_components/AddQuestionDetails'
import {
  useAddQuestion,
  useDeleteQuestion,
  useUpdateQuestion,
  useSwapQuestions,
} from '@/hooks/manage/reviewsHooks'

export default function Page({ reviewSkeleton }) {
  const [questions, setQuestions] = useState(reviewSkeleton.questions || [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [newQuestionType, setNewQuestionType] = useState(null)
  const [newQuestion, setNewQuestion] = useState(null)

  const addQuestion = useAddQuestion()
  const updateQuestion = useUpdateQuestion()
  const deleteQuestion = useDeleteQuestion()
  const swapQuestions = useSwapQuestions()

  const handleAddQuestion = (type_question, more_than_one_answer_allowed) => {
    setNewQuestionType(type_question)
    setNewQuestion({
      id: Date.now().toString(),
      type_question,
      question: '',
      max_value: type_question === 'rating' ? 5 : undefined,
      options:
        type_question === 'multiple_choice'
          ? ['Opción 1', 'Opción 2']
          : undefined,
      more_than_one_answer_allowed,
    })
    setIsAddDialogOpen(false)
    setIsDetailsDialogOpen(true)
  }

  const handleSaveNewQuestion = async () => {
    delete newQuestion.id
    await addQuestion.mutateAsync({
      newQuestion: newQuestion,
      reviewSkeleton: { questions: questions },
    })

    setQuestions([...questions, newQuestion])
    setIsDetailsDialogOpen(false)
    setNewQuestion(null)
    setNewQuestionType(null)
  }

  const handleUpdateQuestion = async ({ updatedQuestion, index }) => {
    await updateQuestion.mutateAsync({
      updatedQuestion: { ...updatedQuestion, index: index },
      reviewSkeleton: { questions: questions },
    })
    setQuestions(
      questions.map((q, idx) => (idx === index ? updatedQuestion : q))
    )
  }

  const handleDeleteQuestion = async (question) => {
    await deleteQuestion.mutateAsync({
      questionToDelete: question,
      reviewSkeleton: { questions: questions },
    })
    setQuestions(questions.filter((q) => q.question !== question.question))
  }

  const handleSwapQuestions = async (
    firstQuestionIndex,
    secondQuestionIndex
  ) => {
    await swapQuestions.mutateAsync({
      firstQuestionIndex,
      secondQuestionIndex,
      reviewSkeleton: { questions: questions },
    })
  }

  return (
    <ContainerPage>
      <TitlePage title={'Configuración de formulario de revisión'} />

      <QuestionsList
        questions={questions}
        recommendation={reviewSkeleton.recommendation}
        handleSwapQuestions={handleSwapQuestions}
        handleUpdateQuestion={handleUpdateQuestion}
        handleDeleteQuestion={handleDeleteQuestion}
        isPending={
          addQuestion.isPending ||
          updateQuestion.isPending ||
          deleteQuestion.isPending
        }
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
        isPending={
          addQuestion.isPending ||
          updateQuestion.isPending ||
          deleteQuestion.isPending
        }
      />
    </ContainerPage>
  )
}
