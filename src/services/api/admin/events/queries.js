

export const apiGetAllEventsWaitingApproval = async (httpClient, offset = 0, limit = 10) => {
  const response = await httpClient.get("/", { status: 'WAITING_APPROVAL', offset, limit }, {});
  return response.data;
};
