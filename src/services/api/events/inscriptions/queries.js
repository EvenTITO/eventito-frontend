export const apiGetInscriptions = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/inscriptions/my-inscriptions`)).data;
};

export const apiUpdateInscription = async (httpClient, eventId, inscriptionId, body) => {
  return (await httpClient.put(`/${eventId}/inscriptions/${inscriptionId}`, body));
};
