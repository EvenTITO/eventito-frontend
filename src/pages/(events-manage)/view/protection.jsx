import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import FetchStatus from '@/components/FetchStatus'
import { useGetEvent } from '@/hooks/events/useEventState'
import { EVENT_ROLES_LABELS } from '@/lib/Constants'

export default function ProtectedRoute({ children }) {
  const params = useParams()
  const { data: eventData, isPending, error } = useGetEvent(params.id)

  if (isPending) {
    return <FetchStatus isLoading={true} />
  }

  if (error) {
    return <FetchStatus error={error} />
  }

  return <Protection roles={eventData?.roles || []}>{children}</Protection>
}

function Protection({ roles, children }) {
  const requiredRoles = Object.keys(EVENT_ROLES_LABELS)
  if (!roles.some((role) => requiredRoles.includes(role))) {
    return children
  }

  const { id } = useParams()
  return <Navigate to={`/events/${id}/view`} replace />
}
