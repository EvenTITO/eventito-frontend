import ContainerPage from "@/pages/(events-manage)/_components/containerPage";
import TitlePage from "@/pages/(events-manage)/_components/titlePage";
import AddTrackDialog from "./_components/AddTrackDialog";
import TracksTable from "./_components/TracksTable";
import {useAddChairToTrack, useAddTrack, useDeleteChairOfTrack,} from "@/hooks/manage/tracksHooks";
import {toast} from "@/hooks/use-toast.js";

export default function Page({tracks, chairs}) {
  const initialTracks = tracks.map((track, index) => ({
    ...track,
    id: index,
  }));

  const addChairToTrack = useAddChairToTrack();
  const deleteChairOfTrack = useDeleteChairOfTrack();
  const addTrack = useAddTrack();

  function getUserIdByEmail(email) {
    return chairs.filter((chair) => chair.email === email)[0]?.userId;
  }

  async function onDelete(track, email, refetch = true) {
    const userId = getUserIdByEmail(email);
    await deleteChairOfTrack.mutateAsync({track: track, userId: userId});
  }

  async function onAdd(track, email, refetch = true) {
    const userId = getUserIdByEmail(email);
    await addChairToTrack.mutateAsync({track: track, userId: userId});
  }

  async function onUpdate(track, newEmail, oldEmail) {
    await onDelete(track, oldEmail, false);
    await onAdd(track, newEmail, false);
  }

  const handleAddTrack = async (newTrack) => {
    try {
      await addTrack.mutateAsync({
        eventTracks: tracks.map(track => track.track),
        track:newTrack
      });
      toast({
        title: "Track agregado",
        description: `${newTrack} agregado con éxito.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al agregar el track. Intente nuevamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <ContainerPage>
      <TitlePage
        title={"Administración de tracks"}
        rightComponent={<AddTrackDialog onSave={handleAddTrack}/>}
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
