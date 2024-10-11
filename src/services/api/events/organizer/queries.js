import { eventsClient } from '../../clients'

export const apiGetAllWorks = async (eventId) => {
  return (await eventsClient.get(`/${eventId}/works`)).data
}

export const apiPutTalkForWork = async (eventId, workId, talkData) => {
  return await eventsClient.put(
    `/${eventId}/works/${workId}/administration`,
    talkData
  )
}
