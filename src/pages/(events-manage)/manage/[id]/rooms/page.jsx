import TitlePage from '@/pages/_components/PageStyles/TitlePage.jsx'
import ContainerPage from '@/pages/_components/Containers/ContainerPage.jsx'
import RoomsTable from '@/pages/(events-manage)/manage/[id]/rooms/_components/RoomsTable.jsx'
import RoomDialog from '@/pages/(events-manage)/manage/[id]/rooms/_components/RoomDialog.jsx'
import { useEditEvent } from '@/hooks/manage/generalHooks.js'
import { toast } from '@/hooks/use-toast.js'

export default function Page({ event, rooms }) {
  const { mutateAsync: submitEditEvent, isPending, error } = useEditEvent()

  const handleSave = async (newMetadata) => {
    const eventWithoutTitle = (({ title, ...rest }) => rest)(event)
    eventWithoutTitle.mdata = newMetadata
    await submitEditEvent({ eventData: eventWithoutTitle })
  }

  const handleDeleteRoom = async (index) => {
    const newRooms = rooms.filter((room, idx) => idx !== index)
    await handleSave({ ...event.mdata, rooms: newRooms })
      .then(() => {
        toast({
          title: 'Sala eliminada',
          description: 'La sala fue eliminada con éxito.',
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al eliminar la sala. Intente nuevamente.',
          variant: 'destructive',
        })
      })
  }

  const handleAddRoom = async (newRoom, idx = undefined) => {
    const newRooms = [...rooms, newRoom]
    await handleSave({ ...event.mdata, rooms: newRooms })
      .then(() => {
        toast({
          title: 'Sala agregada',
          description: `Sala ${newRoom.name} agregada con éxito.`,
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al agregar la sala. Intente nuevamente.',
          variant: 'destructive',
        })
      })
  }

  const handleEditRoom = async (editedRoom, index = undefined) => {
    const newRooms = rooms.map((room, idx) =>
      idx === index ? editedRoom : room
    )
    await handleSave({ ...event.mdata, rooms: newRooms })
      .then(() => {
        toast({
          title: 'Sala actualizada',
          description: `Sala ${editedRoom.name} actualizada con éxito.`,
        })
      })
      .catch((e) => {
        console.error(e)
        toast({
          title: 'Error',
          description: 'Error al actualizar la sala. Intente nuevamente.',
          variant: 'destructive',
        })
      })
  }

  return (
    <ContainerPage>
      <TitlePage
        title={'Administración de salas'}
        rightComponent={<RoomDialog onSave={handleAddRoom} />}
      />
      <div className="space-y-6 pt-6">
        <RoomsTable
          rooms={rooms}
          onUpdate={handleEditRoom}
          onDelete={handleDeleteRoom}
        />
      </div>
    </ContainerPage>
  )
}
