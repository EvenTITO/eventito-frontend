import { EVENTS_URL } from '@/lib/Constants'
import { HTTPClient } from '@/services/api/HTTPClient'
import { getEventId } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  apiUpdateReviewSkeleton,
  apiUpdateDatesEvent,
} from '@/services/api/events/general/queries'
import { convertReviewSkeleton } from '@/services/api/events/general/conversor'
import { useGetEvent } from '@/hooks/events/useEventState'
import { format } from 'date-fns'

export function useAddQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newQuestion, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)

      const newQuestions = [...reviewSkeleton.questions, newQuestion]
      const newReviewSkeleton = convertReviewSkeleton(newQuestions)

      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useDeleteQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ questionToDelete, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const newQuestions = reviewSkeleton.questions.filter(
        (q) => q.question !== questionToDelete.question
      )
      const newReviewSkeleton = convertReviewSkeleton(newQuestions)
      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useUpdateQuestion() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ updatedQuestion, reviewSkeleton }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const newQuestions = reviewSkeleton.questions.map((q, index) =>
        index === updatedQuestion.index ? updatedQuestion : q
      )
      const newReviewSkeleton = convertReviewSkeleton(newQuestions)

      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useSwapQuestions() {
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      firstQuestionIndex,
      secondQuestionIndex,
      reviewSkeleton,
    }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const temp = reviewSkeleton.questions[firstQuestionIndex]
      reviewSkeleton.questions[firstQuestionIndex] =
        reviewSkeleton.questions[secondQuestionIndex]
      reviewSkeleton.questions[secondQuestionIndex] = temp
      console.log(JSON.stringify(reviewSkeleton))
      const newReviewSkeleton = convertReviewSkeleton(reviewSkeleton.questions)

      await apiUpdateReviewSkeleton(httpClient, eventId, newReviewSkeleton)
      return reviewSkeleton
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useEditEventDeadlineSubmissionDate() {
  const eventId = getEventId()
  const queryClient = useQueryClient()
  const useAddOrChangeDate = useEditEventDate('SUBMISSION_DEADLINE_DATE')
  return useMutation({
    mutationFn: async ({ newDate }) => {
      await useAddOrChangeDate.mutateAsync({ newDate })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}

export function useEditEventDate(dateName) {
  const eventId = getEventId()
  const { data: event } = useGetEvent(eventId)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newDate }) => {
      const httpClient = new HTTPClient(EVENTS_URL)
      const newDates = event.dates.slice()
      const dateIndex = event.dates.findIndex((date) => date.name === dateName)
      newDates[dateIndex].date = format(newDate, 'yyyy-MM-dd')
      newDates[dateIndex].time = format(newDate, 'HH:mm:ss')
      return await apiUpdateDatesEvent(httpClient, eventId, {
        dates: newDates,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getEventById', { eventId }],
      })
    },
  })
}
