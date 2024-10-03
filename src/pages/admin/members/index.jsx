import { useAdminGetUsers } from '@/hooks/admin/adminUsersHooks'
import Page from './page'
import FetchStatus from '@/components/FetchStatus'

export default function AdminMembersPage() {
  const { data: members, isPending, error } = useAdminGetUsers()

  if (members) {
    console.log(members)
  }

  const component = <Page members={members || []} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
