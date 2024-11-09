import { useMemo, useState } from 'react'
import { Table } from '.'
import { Pagination } from '@nextui-org/pagination'
import { TableBody } from '@nextui-org/table'

export default function TableWithPagination({
  columns,
  completeItems,
  rowsPerPage = 5,
  renderRow,
}) {
  const [page, setPage] = useState(1)
  const pages = Math.ceil(completeItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return completeItems.slice(start, end)
  }, [page, completeItems])

  return (
    <Table
      columns={columns}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="default"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableBody items={items}>
        {(item, index) => renderRow(item, index)}
      </TableBody>
    </Table>
  )
}
