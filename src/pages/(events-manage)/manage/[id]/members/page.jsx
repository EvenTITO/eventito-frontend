import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import AddMemberButton from './_components/AddMemberButton'
import MembersTable from './_components/MembersTable'
import {
  useUpdateMemberRole,
  useDeleteMember,
} from '@/hooks/manage/membersHooks'

export default function Page({ members, membersPending }) {
  // TODO: use the error and isPending everywhere
  const {
    mutateAsync: updateMemberRole,
    isPending: updatePending,
    error: updateError,
  } = useUpdateMemberRole()

  const {
    mutateAsync: deleteMember,
    isPending: deletePending,
    error: deleteError,
  } = useDeleteMember()

  async function onRoleChange(member, newRole) {
    await updateMemberRole({
      userId: member.id,
      newRole: newRole,
    })
  }

  async function onDeleteMember(member) {
    await deleteMember({
      userId: member.id,
    })
  }

  return (
    <ContainerPage>
      <div className="space-y-6">
        <MembersTable
          members={members}
          onRoleChange={onRoleChange}
          isPending={membersPending || updatePending || deletePending}
          onDeleteMember={onDeleteMember}
        />
        <AddMemberButton />
      </div>
    </ContainerPage>
  )
}
