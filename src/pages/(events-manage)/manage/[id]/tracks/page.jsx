import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddTrackDialog from "./_components/AddTrackDialog";
import TracksTable from "./_components/TracksTable";

export default function Page({ tracks }) {
  const initialTracks = [
    { id: "1", name: "Track 1", chairEmail: "chair1@example.com" },
    { id: "2", name: "Track 2", chairEmail: "chair2@example.com" },
    { id: "3", name: "Track 3" },
  ];

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
