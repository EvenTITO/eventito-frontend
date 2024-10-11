import { getEventId } from '@/lib/utils'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { CHAIR_ROLE, ORGANIZER_ROLE } from '@/lib/Constants'
import {
  apiGetEventMembers,
  apiPutMemberRole,
  apiPostMember,
  apiDeleteMember,
} from '@/services/api/events/members/queries'
import { convertEventMembers } from '@/services/api/events/members/conversor'

export function useAddMember() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newMemberEmail, newMemberRole }) => {
      const body = {
        email: newMemberEmail,
        role: newMemberRole,
      }
      await apiPostMember(eventId, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getEventMembers'] })
    },
    onError: (error) => {
      console.error(JSON.stringify(error))
    },
  })
}

export function useGetMembers() {
  const eventId = getEventId()

  return useQuery({
    queryKey: ['getEventMembers', eventId],
    queryFn: async () => {
      const eventMembers = await apiGetEventMembers(eventId)
      return convertEventMembers(eventMembers)
    },
  })
}

export function useUpdateMemberRole() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const roles = [newRole]
      if (newRole === ORGANIZER_ROLE) {
        roles.push(CHAIR_ROLE)
      }
      return await apiPutMemberRole(userId, roles, eventId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getEventMembers'] })
    },
  })
}

export function useDeleteMember() {
  const eventId = getEventId()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId }) => {
      return await apiDeleteMember(eventId, userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getEventMembers'] })
    },
  })
}
