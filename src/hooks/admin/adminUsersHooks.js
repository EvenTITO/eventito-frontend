import { USERS_URL } from '@/lib/Constants'
import {
  apiGetManyUsers,
  apiUpdateUserRole,
} from '@/services/api/admin/users/queries'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { HTTPClient } from '@/services/api/HTTPClient'

export function useAdminGetUsers() {
  return useQuery({
    queryKey: ['adminGetUsers'],
    queryFn: async ({ offset = 0, limit = 100 }) => {
      const httpClient = new HTTPClient(USERS_URL)
      const users = await apiGetManyUsers(httpClient, offset, limit)
      return users
    },
  })
}

export function useAdminUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      // newRole must be one of: "ADMIN", "EVENT_CREATOR", "DEFAULT".
      const httpClient = new HTTPClient(USERS_URL)
      await apiUpdateUserRole(httpClient, userId, { role: newRole })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['adminGetUsers'],
      })
    },
    onError: (e) => {
      console.error(e)
    },
  })
}
