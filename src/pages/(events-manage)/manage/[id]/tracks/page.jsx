import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddTrackDialog from "./_components/AddTrackDialog";
import TracksTable from "./_components/TracksTable";

export default function Page({ tracks }) {
  const initialTracks = tracks.map((track, index) => ({
    ...track,
    id: index,
  }));

  return (
    <ContainerPage>
      <TitlePage
        title={"Administración de tracks"}
        rightComponent={<AddTrackDialog />}
      />
      <div className="space-y-6 pt-6">
        <TracksTable initialTracks={initialTracks} />
      </div>
    </ContainerPage>
  );
}
