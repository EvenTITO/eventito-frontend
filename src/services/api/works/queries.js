

export const apiGetWorksByTrack = async (httpClient, eventId, track, limit=100, offset=0) => {
  return (await httpClient.get(`/${eventId}/works`, {
    track,
    offset,
    limit
  })).data;
};
