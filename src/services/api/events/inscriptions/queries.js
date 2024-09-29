export const apiGetMyInscriptions = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/inscriptions/my-inscription`)).data;
};

export const apiUpdateInscription = async (httpClient, eventId, inscriptionId, body) => {
  return (await httpClient.put(`/${eventId}/inscriptions/${inscriptionId}`, body));
};

export const apiGetInscriptionPayments = async (httpClient, eventId, inscriptionId) => {
  return (await httpClient.get(`/${eventId}/inscriptions/${inscriptionId}/payments`)).data;
};

export const apiSubmitInscription = async (httpClient, eventId, body) => {
  return (await httpClient.post(`/${eventId}/inscriptions`, body));
};

export const apiPutInscriptionPayment = async (httpClient, eventId, inscriptionId, body) => {
  return (await httpClient.put(`/${eventId}/inscriptions/${inscriptionId}/pay`, body));
};

export const apiGetInscriptions = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/inscriptions`)).data;
};

export const apiGetPayments = async (httpClient, eventId) => {
  return (await httpClient.get(`/${eventId}/payments`)).data;
};
