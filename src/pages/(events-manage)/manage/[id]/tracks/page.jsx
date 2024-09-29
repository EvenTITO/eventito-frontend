import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddTrackDialog from "./_components/AddTrackDialog";
import TracksTable from "./_components/TracksTable";
import {
  useAddChairToTrack,
  useDeleteChairOfTrack,
} from "@/hooks/manage/tracksHooks";

export default function Page({ tracks, chairs }) {
  const initialTracks = tracks.map((track, index) => ({
    ...track,
    id: index,
  }));

  const addChairToTrack = useAddChairToTrack();
  const deleteChairOfTrack = useDeleteChairOfTrack();

  function getUserIdByEmail(email) {
    return chairs.filter((chair) => chair.email === email)[0]?.userId;
  }

  async function onDelete(track, email) {
    const userId = getUserIdByEmail(email);
    await deleteChairOfTrack.mutateAsync({ track: track, userId: userId });
  }

  async function onAdd(track, email) {
    const userId = getUserIdByEmail(email);
    await addChairToTrack.mutateAsync({ track: track, userId: userId });
  }

  async function onUpdate(track, newEmail, oldEmail) {
    await onDelete(track, oldEmail);
    await onAdd(track, newEmail);
  }

  return (
    <ContainerPage>
      <TitlePage
        title={"Administración de tracks"}
        rightComponent={<AddTrackDialog />}
      />
      <div className="space-y-6 pt-6">
        <TracksTable
          initialTracks={initialTracks}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isPending={addChairToTrack.isPending || deleteChairOfTrack.isPending}
        />
      </div>
    </ContainerPage>
  );
}
