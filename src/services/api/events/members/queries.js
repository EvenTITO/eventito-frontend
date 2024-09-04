import { z } from "zod";

const uuidSchema = z.string().uuid();

export const apiGetEventMembers = async (httpClient, eventId) => {
  return (await httpClient.get(`/${uuidSchema.parse(eventId)}/members`)).data;
};
