import { REGULAR, EVENT_CREATOR, ADMIN } from './constants'
import Page from './page'

export default function AdminMembersPage() {
  const simulatedMembers = [
    {
      id: '1',
      username: 'john_doe',
      email: 'john@example.com',
      role: REGULAR,
    },
    {
      id: '2',
      username: 'jane_smith',
      email: 'jane@example.com',
      role: EVENT_CREATOR,
    },
    {
      id: '3',
      username: 'admin_user',
      email: 'admin@example.com',
      role: ADMIN,
    },
    {
      id: '4',
      username: 'event_planner',
      email: 'planner@example.com',
      role: EVENT_CREATOR,
    },
    {
      id: '5',
      username: 'regular_joe',
      email: 'joe@example.com',
      role: REGULAR,
    },
  ]

  return <Page members={simulatedMembers} />
}
