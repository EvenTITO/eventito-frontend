import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { format } from '@formkit/tempo'
import TableCursorRow from '@/components/TableCursorRow'
import TableHeaderTitle from '@/components/TableHeaderTitle'
import { WORKS_STATUS_LABELS } from '@/lib/Constants'

export default function WorksTable({ works, handleRowClick }) {
  return (
    <Table>
      <TableHeaderTitle>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Autores</TableHead>
          <TableHead>Fecha límite</TableHead>
          <TableHead>Track</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeaderTitle>
      <TableBody>
        {works.map((work) => (
          <TableCursorRow key={work.id} onClick={() => handleRowClick(work)}>
            <TableCell className="font-medium">{work.title}</TableCell>
            <TableCell>{work.authors.length}</TableCell>
            <TableCell>{format(work.deadlineDate, 'long')}</TableCell>
            <TableCell>{work.track}</TableCell>
            <TableCell>{WORKS_STATUS_LABELS[work.status]}</TableCell>
          </TableCursorRow>
        ))}
      </TableBody>
    </Table>
  )
}
