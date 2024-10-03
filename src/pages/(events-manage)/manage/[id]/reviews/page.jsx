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
} from '@/hooks/manage/reviewsHooks'
import { useToast } from '@/hooks/use-toast'

export default function Page({ reviewSkeleton }) {
  const [questions, setQuestions] = useState(reviewSkeleton.questions || [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [newQuestionType, setNewQuestionType] = useState(null)
  const [newQuestion, setNewQuestion] = useState(null)
  const { toast } = useToast()

  const addQuestion = useAddQuestion()
  const updateQuestion = useUpdateQuestion()
  const deleteQuestion = useDeleteQuestion()

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
    await addQuestion
      .mutateAsync({
        newQuestion: newQuestion,
        reviewSkeleton: { questions: questions },
      })
      .then(() => {
        toast({
          title: 'Nueva pregunta agregada',
          description: `La pregunta ${newQuestion.question} ha sido agregada con éxito.`,
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al agregar la pregunta. Intente nuevamente.',
          variant: 'destructive',
        })
      })

    setQuestions([...questions, newQuestion])
    setIsDetailsDialogOpen(false)
    setNewQuestion(null)
    setNewQuestionType(null)
  }

  const handleUpdateQuestion = async ({ updatedQuestion, index }) => {
    await updateQuestion
      .mutateAsync({
        updatedQuestion: { ...updatedQuestion, index: index },
        reviewSkeleton: { questions: questions },
      })
      .then(() => {
        toast({
          title: 'Pregunta editada',
          description: `La pregunta ${updatedQuestion.question} ha sido editada con éxito.`,
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al editar la pregunta. Intente nuevamente.',
          variant: 'destructive',
        })
      })
    setQuestions(
      questions.map((q, idx) => (idx === index ? updatedQuestion : q))
    )
  }

  const handleDeleteQuestion = async (question) => {
    await deleteQuestion
      .mutateAsync({
        questionToDelete: question,
        reviewSkeleton: { questions: questions },
      })
      .then(() => {
        toast({
          title: 'Pregunta eliminada',
          description: `La pregunta ${question.question} ha sido eliminada con éxito.`,
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al eliminar la pregunta. Intente nuevamente.',
          variant: 'destructive',
        })
      })
    setQuestions(questions.filter((q) => q.question !== question.question))
  }

  return (
    <ContainerPage>
      <TitlePage title={'Configuración de formulario de revisión'} />

      <QuestionsList
        questions={questions}
        recommendation={reviewSkeleton.recommendation}
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
