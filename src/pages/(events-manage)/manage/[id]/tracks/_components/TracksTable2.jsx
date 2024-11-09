import { TableRow, TableCell } from '@nextui-org/table'
import TableWithPagination from '@/components/Table/TableWithPagination'
import TrackActions from './TrackActions'

export default function TracksTable2({
  tracks,
  chairs,
  onAdd,
  onDelete,
  isPending,
}) {
  async function deleteChair(track, email) {
    await onDelete(track, email)
  }

  async function addChair(track, newEmail) {
    await onAdd(track, newEmail)
  }

  if (tracks.length === 0) return <EmptyTracksPage />

  const columns = ['TRACK', 'CHAIR', 'ACCIONES']

  const renderRow = (track, index) => (
    <TableRow key={index}>
      <TableCell>{track.track}</TableCell>
      <TableCell>
        {track.mail ? <p>{track.mail}</p> : <p className='text-gray-500 italic'>Sin chair asignado</p>}
      </TableCell>
      <TableCell>
        <TrackActions
          track={track}
          deleteChair={deleteChair}
          addChair={addChair}
        />
      </TableCell>
    </TableRow>
  )

  return (
    <TableWithPagination
      columns={columns}
      completeItems={tracks}
      renderRow={renderRow}
    />
  )
}

function EmptyTracksPage() {
  return (
    <div className="text-center py-10">
      <h2 className="text-xl font-semibold mb-2">Ningún track cargado</h2>
      <p className="text-gray-500 mb-4">
        Agregar uno nuevo para visualizarlo. Debe configurar al menos un track
        para publicar el evento.
      </p>
    </div>
  )
}
