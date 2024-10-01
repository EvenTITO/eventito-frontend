import { USERS_URL } from '@/lib/Constants'
import { HTTPClient } from '@/services/api/HTTPClient'

const httpClient = new HTTPClient(USERS_URL)

export const apiGetUser = async (userId) => {
  console.log('user en get', userId)
  const response = await httpClient.get(`/${userId}`)
  const { name, lastname, email, role } = response.data
  return {
    id: userId,
    name: name,
    lastname: lastname,
    email: email,
    role: role,
  }
}

export const apiPostUser = async (userId, name, lastname, email) => {
  const requestBody = {
    name: name,
    lastname:
      lastname === null || lastname === undefined || lastname === ''
        ? 'Apellido'
        : lastname,
    email: email,
  }
  console.log('user en post', requestBody)
  return await httpClient.post('', requestBody)
}
