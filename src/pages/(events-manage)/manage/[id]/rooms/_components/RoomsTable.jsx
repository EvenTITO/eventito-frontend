import { TableRow, TableCell } from '@nextui-org/table'
import TableWithPagination from '@/components/Table/TableWithPagination'
import RoomActions from './RoomActions'

export default function RoomsTable({ rooms, onUpdate, onDelete }) {
  if (rooms.length === 0) <EmptyRooms />

  const columns = ['SALA', 'ACCIONES']

  const renderRow = (room, index) => (
    <TableRow key={1}>
      <TableCell className="w-3/4">{room.name}</TableCell>
      <TableCell className='justify-end'>
        <RoomActions room={room} onUpdate={onUpdate} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  )

  return (
    <TableWithPagination
      columns={columns}
      completeItems={rooms}
      renderRow={renderRow}
      hideHeader={true}
    />
  )
}

function EmptyRooms() {
  return (
    <div className="text-center py-10 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Ninguna sala cargada</h2>
      <p className="text-gray-500 mb-4">Agregar una nueva para visualizarla</p>
    </div>
  )
}
