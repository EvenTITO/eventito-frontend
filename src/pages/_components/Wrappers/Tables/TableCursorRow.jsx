import { TableRow } from '@/components/ui/table'

export default function TableCursorRow({ onClick, children }) {
  return (
    <TableRow onClick={onClick} className="cursor-pointer hover:bg-muted/50">
      {children}
    </TableRow>
  )
}
