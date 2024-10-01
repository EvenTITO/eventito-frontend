import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function AuthorsTable({ authors }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Mail</TableHead>
          <TableHead>Filiación</TableHead>
          <TableHead>Presentador</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors.map((author, index) => (
          <TableRow key={index} className={'cursor-pointer hover:bg-muted/50'}>
            <TableCell>{author.username}</TableCell>
            <TableCell>{author.email}</TableCell>
            <TableCell>
              {author.affiliation ? author.affiliation : '-'}
            </TableCell>
            <TableCell>{author.isSpeaker ? 'Sí' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
