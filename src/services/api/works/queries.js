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

export const apiGetSubmissionsForWork = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/works/${workId}/submissions`)).data;
};

export const apiGetWorkDownloadURL = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/works/${workId}/submissions/latest`)).data;
};

export const apiGetReviewsForWork = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/works/${workId}/reviews`)).data;
};

export const apiGetReviewersForWork = async (httpClient, eventId, workId) => {
  return (await httpClient.get(`/${eventId}/reviewers?work_id=${workId}`)).data;
};

export const apiGetMyWorks = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/works/my-works`)).data;
};
