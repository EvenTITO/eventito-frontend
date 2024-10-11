import { z } from 'zod'
import { eventsClient } from '../../clients'

const uuidSchema = z.string().uuid()

export const apiGetEventMembers = async (eventId) => {
  return (await eventsClient.get(`/${uuidSchema.parse(eventId)}/members`)).data
}

export const apiPutMemberRole = async (userId, roles, eventId) => {
  return await eventsClient.put(`/${eventId}/members/${userId}/roles`, {
    roles: roles,
  })
}

export const apiPostMember = async (eventId, body) => {
  return await eventsClient.post(`/${eventId}/members`, body)
}

export const apiDeleteMember = async (eventId, userId) => {
  return await eventsClient.delete(`/${eventId}/members/${userId}`)
}
