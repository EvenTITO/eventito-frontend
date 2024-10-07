export const apiGetAllWorks = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/works`)).data
}

export const apiPutTalkForWork = async (
  httpClient,
  eventId,
  workId,
  talkData
) => {
  return await httpClient.put(
    `/${eventId}/works/${workId}/administration`,
    talkData
  )
}
