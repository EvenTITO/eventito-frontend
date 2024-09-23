import React from "react";
import { useNavigator } from "@/lib/navigation";
import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import TrackSelector from "./_components/TrackSelector";
import ChairTable from "./_components/ChairTable";
import TableContent from "@/components/TableContent";
import Stats from "./_components/Stats";
import Insights from "./_components/Insights";

export default function Component({
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
        title={"Administración y envío de revisiones"}
        rightComponent={
          <TrackSelector
            tracks={tracks}
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        }
      />
      <div className="space-y-6 pt-6">
        <Stats works={works} />

        <TableContent
          title={`Trabajos pendientes a revisar en track: ${selectedTrack}`}
        >
          <ChairTable works={works} handleRowClick={handleRowClick} />
        </TableContent>

        <Insights works={works} />
      </div>
    </ContainerPage>
  );
}
