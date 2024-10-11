import { eventsClient } from '../../clients'

export const apiGetAssignments = async (eventId) => {
  return (await eventsClient.get(`/${eventId}/reviewers/my-assignments`)).data
}

export const apiPostReview = async (eventId, workId, body) => {
  return await eventsClient.post(`/${eventId}/works/${workId}/reviews`, body)
}

export const apiPutReviewDeadline = async (eventId, body) => {
  return await eventsClient.put(`/${eventId}/reviewers`, body)
}

export const apiPostAddReviewer = async (eventId, body) => {
  return await eventsClient.post(`/${eventId}/reviewers`, body)
}

export const apiPostReviewsPublish = async (eventId, workId, body) => {
  return await eventsClient.post(
    `/${eventId}/works/${workId}/reviews/publish`,
    body
  )
}
