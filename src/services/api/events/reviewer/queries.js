export const apiGetAssignments = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/reviewers/my-assignments`)).data;
};

export const apiPostReview = async (httpClient, eventId, workId, body) => {
  return (await httpClient.post(`/${eventId}/works/${workId}/reviews`, body));
};

export const apiPutReviewDeadline = async (httpClient, eventId, body) => {
  return (await httpClient.put(`/${eventId}/reviewers`, body));
};

export const apiPostAddReviewer = async (httpClient, eventId, body) => {
  return (await httpClient.post(`/${eventId}/reviewers`, body));
};

export const apiPostReviewsPublish = async (httpClient, eventId, workId, body) => {
  return (await httpClient.post(`/${eventId}/works/${workId}/reviews/publish`, body));
};