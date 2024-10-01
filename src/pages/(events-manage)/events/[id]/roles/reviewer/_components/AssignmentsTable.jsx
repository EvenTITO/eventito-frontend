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

export default function AssignmentsTable({ assignments, handleRowClick }) {
  return (
    <Table>
      <TableHeaderTitle>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Autores</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Fecha límite de revisión</TableHead>
          <TableHead>Track</TableHead>
        </TableRow>
      </TableHeaderTitle>
      <TableBody>
        {assignments.map((assignment) => (
          <TableCursorRow
            key={assignment.id}
            onClick={() => handleRowClick(assignment)}
          >
            <TableCell className="font-medium">{assignment.title}</TableCell>
            <TableCell>{assignment.authorCount}</TableCell>
            <TableCell>{assignment.submitter}</TableCell>
            <TableCell>{format(assignment.maxReviewDate, 'long')}</TableCell>
            <TableCell>{assignment.track}</TableCell>
          </TableCursorRow>
        ))}
      </TableBody>
    </Table>
  )
}
