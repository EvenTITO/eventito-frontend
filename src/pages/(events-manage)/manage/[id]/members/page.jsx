import React from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddMemberButton from "./_components/AddMemberButton";
import MembersTable from "./_components/MembersTable";
import { useUpdateMemberRole } from "@/hooks/manage/membersHooks";

export default function Component({ members }) {
  const {
    mutateAsync: updateMemberRole,
    isPending,
    error,
  } = useUpdateMemberRole();

  async function onRoleChange(member, newRole) {
    await updateMemberRole({
      userId: member.id,
      newRole: newRole,
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
        />
      </div>
    </ContainerPage>
  );
}
