import { WAITING_APPROVAL_STATUS } from '@/lib/Constants.js'
import { eventsClient } from '../../clients'

export const apiGetAllEventsWaitingApproval = async (
  offset = 0,
  limit = 10
) => {
  const response = await eventsClient.get(
    '/',
    { status: WAITING_APPROVAL_STATUS, offset, limit },
    {}
  )
  return response.data
}

export const apiAdminUpdateEventStatus = async (eventId, newStatus) => {
  const response = await eventsClient.patch(`/${eventId}/status`, newStatus)
  return response.data
}
