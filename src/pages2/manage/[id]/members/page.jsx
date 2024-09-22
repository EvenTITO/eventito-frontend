import * as React from "react";
import { useParams } from "react-router-dom";
import { DataTableDemo } from "./data-table";
import { useQueryMembers } from "@/services/api/events/members/hooks";
import PageTitle from "../../_components/PageTitle";

export default function MembersPage() {
  const { id } = useParams();
  const { isPending, error, data } = useQueryMembers(id);
  if (isPending) {
    return <div>loading...</div>; // TODO: loader
  } else {
    data.map((user) => {
      return {
        userId: user.id,
        ...user,
      };
    });
    return (
      <div className="w-full space-y-4">
        <PageTitle title={"Miembros"} />
        <DataTableDemo data={data} />
      </div>
    );
  }
}
