import * as React from "react";
import { DataTableDemo } from "./data-table";
import { useQueryMembers } from "@/services/api/events/queries";
import PageTitle from "../../_components/PageTitle";

export default function MembersPage() {
  const { isPending, error, data } = useQueryMembers();
  if (isPending) {
    return <div>loading...</div>; // TODO: loader
  } else {
    return (
      <div className="w-full space-y-4">
        <PageTitle title={"Miembros"} />
        <DataTableDemo data={data} />
      </div>
    );
  }
}
