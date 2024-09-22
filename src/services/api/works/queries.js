

export const apiGetWorksByTrack = async (httpClient, eventId, track, limit=100, offset=0) => {
  return (await httpClient.get(`/${eventId}/works`, {
    track,
    offset,
    limit
  })).data;
};


export const apiGetWorkById = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/works/${workId}`)).data;
};

export const apiGetWorkDownloadURL = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/works/${workId}/submissions/latest`)).data;
};
