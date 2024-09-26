export const apiGetAssignments = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/reviewers/my-assignments`)).data;
};

export const apiPostReview = async (httpClient, eventId, workId, body) => {
  return (await httpClient.post(`/${eventId}/works/${workId}/reviews`, body));
};
