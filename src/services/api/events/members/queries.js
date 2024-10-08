import { z } from 'zod'

const uuidSchema = z.string().uuid()

export const apiGetEventMembers = async (httpClient, eventId) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/members`)).data
}

export const apiPutMemberRole = async (httpClient, userId, roles, eventId) => {
  return await httpClient.put(`/${eventId}/members/${userId}/roles`, {
    roles: roles,
  })
}

export const apiPostMember = async (httpClient, eventId, body) => {
  return await httpClient.post(`/${eventId}/members`, body)
}

export const apiDeleteMember = async (httpClient, eventId, userId) => {
  return await httpClient.delete(`/${eventId}/members/${userId}`)
}
