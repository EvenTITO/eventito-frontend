import { getEventId, getWorkId } from '@/lib/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  apiGetReviewersForWork,
  apiGetReviewsForWork,
  apiGetWorksByTrack,
} from '@/services/api/works/queries'
import {
  convertReviewers,
  convertReviews,
  convertWorks,
} from '@/services/api/works/conversor'
import {
  apiPostAddReviewer,
  apiPostReviewsPublish,
  apiPutReviewDeadline,
} from '@/services/api/events/reviewer/queries'
import { format } from 'date-fns'
import { apiGetMyEventChair } from '@/services/api/events/chair/queries.js'
import { convertEventChair } from '@/services/api/events/chair/conversor.js'
import { ORGANIZER_ROLE } from '@/lib/Constants.js'

export function useGetWorksByTrack(tracksSettled, track) {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getWorksByTrack', { eventId, track }],
    queryFn: async () => {
      if (!track) {
        return []
      }
      const works = await apiGetWorksByTrack(eventId, track)
      return convertWorks(works)
    },
    enabled: !!tracksSettled,
  })
}

export function useGetReviewsForWork() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getReviewsForWork', { workId }],
    queryFn: async () => {
      const workReviews = await apiGetReviewsForWork(eventId, workId)
      return convertReviews(workReviews)
    },
  })
}

export function useGetReviewersForWork() {
  const workId = getWorkId()
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getReviewersForWork', { workId }],
    queryFn: async () => {
      const reviewers = await apiGetReviewersForWork(eventId, workId)
      return convertReviewers(reviewers)
    },
  })
}

export function useAddReviewer() {
  const workId = getWorkId()
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ email, deadline }) => {
      const review_deadline = format(
        new Date(deadline),
        "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
      )

      const reviewer = {
        review_deadline: review_deadline,
        work_id: workId,
        email: email,
      }
      const reviewers = { reviewers: [reviewer] }

      return await apiPostAddReviewer(eventId, reviewers)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getReviewersForWork', { workId }],
      })
    },
  })
}

export function useSubmitChairReview(reviews) {
  const reviewsIds = reviews !== undefined ? reviews.map((r) => r.reviewId) : []
  const workId = getWorkId()
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ status, deadlineDate }) => {
      let reviewsToPublish = {
        reviews_to_publish: reviewsIds,
        new_work_status: status,
      }
      if (deadlineDate !== undefined) {
        reviewsToPublish.resend_deadline = format(
          new Date(deadlineDate),
          "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
        )
      }
      return await apiPostReviewsPublish(eventId, workId, reviewsToPublish)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getReviewsForWork', { workId }],
      })
    },
    onError: (error) => {
      const errorDesc = `Ups!! Hubo 1 Er0rr!\nError description: ${error}\nError Detail: ${error.response.data.detail}`
      console.error(errorDesc)
      alert(errorDesc)
    },
  })
}

export function useUpdateReviewDeadlineForReviewer() {
  const workId = getWorkId()
  const eventId = getEventId()

  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ reviewerId, deadline }) => {
      const formattedDatetime = format(
        new Date(deadline),
        "yyyy-MM-dd'T'HH:mm:ss.SSSSSS"
      )
      const reviewer = {
        work_id: workId,
        user_id: reviewerId,
        review_deadline: formattedDatetime,
      }
      return await apiPutReviewDeadline(eventId, reviewer)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getReviewersForWork', { workId }],
      })
    },
  })
}

export function useGetMyTracks(roles) {
  const eventId = getEventId()
  return useQuery({
    queryKey: ['getMyTracks', { eventId }],
    queryFn: async () => {
      if (roles.includes(ORGANIZER_ROLE)) {
        return null
      } else {
        const myChair = await apiGetMyEventChair(eventId)
        return convertEventChair(myChair).tracks
      }
    },
    enabled: !!roles,
  })
}
