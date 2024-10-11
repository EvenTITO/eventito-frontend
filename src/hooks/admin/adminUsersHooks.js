import {
  apiGetManyUsers,
  apiUpdateUserRole,
} from '@/services/api/admin/users/queries'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export function useAdminGetUsers() {
  return useQuery({
    queryKey: ['adminGetUsers'],
    queryFn: async ({ offset = 0, limit = 100 }) => {
      const users = await apiGetManyUsers(offset, limit)
      return users
    },
  })
}

export function useAdminUpdateUserRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      await apiUpdateUserRole(userId, { role: newRole })
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
