import { usersClient } from '../../clients'

export const apiGetManyUsers = async (offset = 0, limit = 100) => {
  const response = await usersClient.get('', { offset, limit })
  return response.data
}

export const apiUpdateUserRole = async (userId, newRole) => {
  const response = await usersClient.patch(`/${userId}/roles`, newRole)
  return response.data
}
