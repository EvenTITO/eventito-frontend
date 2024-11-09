import {
  TableBody,
  TableColumn,
  TableHeader,
  Table as TableUI,
} from '@nextui-org/table'

export default function Table({ columns, tableBody, ...props }) {
  return (
    <TableUI {...props}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn>{column}</TableColumn>
        ))}
      </TableHeader>
      {tableBody}
    </TableUI>
  )
}
