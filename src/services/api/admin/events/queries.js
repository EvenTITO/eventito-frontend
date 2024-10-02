import { WAITING_APPROVAL_STATUS } from '@/lib/Constants.js'

export const apiGetAllEventsWaitingApproval = async (
  httpClient,
  offset = 0,
  limit = 10
) => {
  const response = await httpClient.get(
    '/',
    { status: WAITING_APPROVAL_STATUS, offset, limit },
    {}
  )
  return response.data
}

export const apiAdminUpdateEventStatus = async (
  httpClient,
  eventId,
  newStatus
) => {
  const response = await httpClient.patch(`/${eventId}/status`, newStatus)
  return response.data
}
