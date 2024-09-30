export const apiGetManyUsers = async (httpClient, offset = 0, limit = 100) => {
  const response = await httpClient.get("", { offset, limit }, {});
  return response.data;
};

export const apiUpdateUserRole = async (httpClient, userId, newRole) => {
  const response = await httpClient.patch(`/${userId}/roles`, newRole);
  return response.data;
};
