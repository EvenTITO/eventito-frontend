export const apiGetMyInscriptions = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/inscriptions/my-inscriptions`)).data;
};

export const apiUpdateInscription = async (httpClient, eventId, inscriptionId, body) => {
  return (await httpClient.put(`/${eventId}/inscriptions/${inscriptionId}`, body));
};

export const apiGetInscriptionPayments = async (httpClient, eventId, inscriptionId) => {
  return (await httpClient.get(`/${eventId}/inscriptions/${inscriptionId}/payments`)).data;
};
