export const apiGetAllWorks = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/works`)).data
}
