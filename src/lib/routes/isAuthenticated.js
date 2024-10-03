import { useSelector } from 'react-redux'
import { ADMIN_EVENTITO_ROLE } from '../Constants'

export function isAuthenticated() {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser !== null
}

export function isAdmin() {
  const { currentUser } = useSelector((state) => state.user)

  return currentUser !== null && currentUser.role === ADMIN_EVENTITO_ROLE
}
