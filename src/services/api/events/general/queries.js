import { z } from 'zod'
import { eventsClient } from '../../clients'

const uuidSchema = z.string().uuid()

export const apiGetEventById = async (eventId) => {
  return (await eventsClient.get(`/${uuidSchema.parse(eventId)}/public`)).data
}

export const apiGetMyEvents = async () => {
  return (await eventsClient.get('/my-events')).data
}

export const apiGetAllEvents = async () => {
  return (await eventsClient.get('/', { status: 'STARTED' })).data
}

export const apiPostCreateEvent = async (body) => {
  return await eventsClient.post('', body)
}

export const apiUpdateGeneralEvent = async (eventId, body) => {
  return await eventsClient.put(`/${eventId}/configuration/general`, body)
}

export const apiGetUploadEventImageUrl = async (eventId, imageName) => {
  return (await eventsClient.get(`/${eventId}/upload_url/${imageName}`)).data
}

export const apiUpdateReviewSkeleton = async (eventId, body) => {
  return (
    await eventsClient.put(`/${eventId}/configuration/review-skeleton`, body)
  ).data
}

export const apiUpdatePricingEvent = async (eventId, body) => {
  return await eventsClient.put(`/${eventId}/configuration/pricing`, body)
}

export const apiUpdateDatesEvent = async (eventId, body) => {
  return await eventsClient.put(`/${eventId}/configuration/dates`, body)
}

export const apiUpdateEventStatus = async (eventId, newStatus) => {
  return await eventsClient.patch(`/${eventId}/status`, newStatus)
}
