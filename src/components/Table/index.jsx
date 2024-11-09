import {
  TableColumn,
  TableHeader,
  Table as TableUI,
} from '@nextui-org/table'

export function Table({ columns, children, ...props }) {
  return (
    <TableUI {...props}>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn>{column}</TableColumn>
        ))}
      </TableHeader>
      {children}
    </TableUI>
  )
}
