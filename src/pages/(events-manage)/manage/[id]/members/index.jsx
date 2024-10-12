import FetchStatus from '@/components/FetchStatus'
import { useGetMembers } from '@/hooks/manage/membersHooks'
import Page from './page'

export default function MembersConfigPage() {
  const { data: members, isPending, error } = useGetMembers()

  const component = <Page members={members} membersPending={isPending} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
