import TableHeaderTitle from "@/components/TableHeaderTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { format } from "@formkit/tempo";

export default function ChairTable({ assignments, handleRowClick }) {
  return (
    <Table>
      <TableHeaderTitle>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead>Responsable</TableHead>
          <TableHead>Autores</TableHead>
          <TableHead>Fecha de envío</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Revisión enviada</TableHead>
        </TableRow>
      </TableHeaderTitle>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow
            key={assignment.id}
            onClick={() => handleRowClick(assignment)}
            className="cursor-pointer hover:bg-muted/50"
          >
            <TableCell className="font-medium">{assignment.title}</TableCell>
            <TableCell>{assignment.submitter}</TableCell>
            <TableCell>{assignment.authorCount}</TableCell>
            <TableCell>{format(assignment.submissionDate, "long")}</TableCell>
            <TableCell>{assignment.status}</TableCell>
            <TableCell>{assignment.published ? "Sí" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
