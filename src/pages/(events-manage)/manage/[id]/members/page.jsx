import React from "react";
import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddMemberButton from "./_components/AddMemberButton";
import MembersTable from "./_components/MembersTable";
import { useUpdateMemberRole, useDeleteMember } from "@/hooks/manage/membersHooks";

export default function Component({ members }) {
  const navigator = useNavigator();
  const {
    mutateAsync: updateMemberRole,
    isPending,
    error,
  } = useUpdateMemberRole();

  const {
    mutateAsync: deleteMember,
    deletePending,
    deleteError,
  } = useDeleteMember();

  async function onRoleChange(member, newRole) {
    await updateMemberRole({
      userId: member.id,
      newRole: newRole,
    });
  }

  async function onDeleteMember(member) {
    await deleteMember({
      userId: member.id,
    });
  }


  return (
    <ContainerPage>
      <TitlePage
        title={"Comité de miembros del evento"}
        rightComponent={<AddMemberButton />}
      />
      <div className="space-y-6 pt-6">
        <MembersTable
          members={members}
          onRoleChange={onRoleChange}
          isPending={isPending}
          onDeleteMember={onDeleteMember}
        />
      </div>
    </ContainerPage>
  );
}
