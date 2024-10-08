import { z } from 'zod'

const uuidSchema = z.string().uuid()

export const apiGetEventById = async (httpClient, eventId) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/public`)).data
}

export const apiGetMyEvents = async (httpClient) => {
  return (await httpClient.get('/my-events')).data
}

export const apiGetAllEvents = async (httpClient) => {
  return (await httpClient.get('/', { status: 'STARTED' })).data
}

export const apiPostCreateEvent = async (httpClient, body) => {
  return await httpClient.post('', body)
}

export const apiUpdateGeneralEvent = async (httpClient, eventId, body) => {
  return await httpClient.put(`/${eventId}/configuration/general`, body)
}

export const apiGetUploadEventImageUrl = async (
  httpClient,
  eventId,
  imageName
) => {
  return (await httpClient.get(`/${eventId}/upload_url/${imageName}`)).data
}

export const apiUpdateReviewSkeleton = async (httpClient, eventId, body) => {
  return (
    await httpClient.put(`/${eventId}/configuration/review-skeleton`, body)
  ).data
}

export const apiUpdatePricingEvent = async (httpClient, eventId, body) => {
  return await httpClient.put(`/${eventId}/configuration/pricing`, body)
}

export const apiUpdateDatesEvent = async (httpClient, eventId, body) => {
  return await httpClient.put(`/${eventId}/configuration/dates`, body)
}

export const apiUpdateEventStatus = async (httpClient, eventId, newStatus) => {
  return await httpClient.patch(`/${eventId}/status`, newStatus)
}
