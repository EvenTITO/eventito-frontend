export const apiGetAssignments = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/reviewers/my-assignments`)).data;
};
