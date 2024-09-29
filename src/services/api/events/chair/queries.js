export const apiGetEventChairs = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/chairs`)).data;
};

export const apiGetEventChair = async (httpClient, eventId, userId) => {
  return (await httpClient.get(`/${eventId}/chairs/${userId}`)).data;
};

export const apiUpdateChairTracks = async (
  httpClient,
  eventId,
  userId,
  tracksUpdate,
) => {
  return await httpClient.put(
    `/${eventId}/chairs/${userId}/tracks`,
    tracksUpdate,
  );
};
