import TableCursorRow from "@/components/TableCursorRow";
import TableHeaderTitle from "@/components/TableHeaderTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { format } from "@formkit/tempo";
import { WORKS_STATUS_LABELS } from "@/lib/Constants"

export default function ChairTable({ works: works, handleRowClick }) {
  return (
    <Table>
      <TableHeaderTitle>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Responsable</TableHead>
          <TableHead>Autores</TableHead>
          <TableHead>Fecha de envío</TableHead>
          <TableHead>Estado</TableHead>
        </TableRow>
      </TableHeaderTitle>
      <TableBody>
        {works.map((work) => (
          <TableCursorRow
            key={work.id}
            onClick={() => handleRowClick(work)}
          >
            <TableCell className="font-medium">{work.title}</TableCell>
            <TableCell>{work.submitter}</TableCell>
            <TableCell>{work.authorCount}</TableCell>
            <TableCell>{format(work.creationDate, "long")}</TableCell>
            <TableCell>{WORKS_STATUS_LABELS[work.status]}</TableCell>
          </TableCursorRow>
        ))}
      </TableBody>
    </Table>
  );
}
