import React from "react";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import { useNavigator } from "@/lib/navigation";
import TrackSelector from "./_components/TrackSelector";
import ChairTable from "./_components/ChairTable";
import TableContent from "@/components/TableContent";

export default function Page({
  tracks,
  selectedTrack,
  setSelectedTrack,
  works,
}) {
  const navigator = useNavigator();

  const handleRowClick = (work) => {
    const path = `works/${work.id}`;
    navigator.foward(path);
  };

  return (
    <ContainerPage>
      <TitlePage
        title={`Administración de revisiones`}
        rightComponent={
          <TrackSelector
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        }
      />
      <TableContent title={"Entregas en track: " + selectedTrack}>
        <ChairTable works={works} handleRowClick={handleRowClick} />
      </TableContent>
    </ContainerPage>
  );
}
