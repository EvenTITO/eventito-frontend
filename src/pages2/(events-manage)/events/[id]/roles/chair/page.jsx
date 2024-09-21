import React from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import TrackSelector from "./_components/TrackSelector";
import ChairTable from "./_components/ChairTable";
import TableContent from "@/components/TableContent";

export default function Page({ tracks, selectedTrack, assignments }) {
  const navigator = useNavigator();

  const handleRowClick = (assignment) => {
    const path = `works/${assignment.id}`;
    navigator.foward(path);
  };

  return (
    <ContainerPage>
      <TitlePage
        title={`Administración de revisiones`}
        rightComponent={
          <TrackSelector tracks={tracks} selectedTrack={selectedTrack} />
        }
      />
      <TableContent title={"Revisiones"}>
        <ChairTable assignments={assignments} handleRowClick={handleRowClick} />
      </TableContent>
    </ContainerPage>
  );
}
