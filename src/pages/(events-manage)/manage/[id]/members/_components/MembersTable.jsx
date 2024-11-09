import { EVENT_ROLES_LABELS } from '@/lib/Constants'
import { TableRow, TableCell } from '@nextui-org/table'
import User from '@/components/ui/User'
import ChipByRole from './ChipByRole'
import TableWithPagination from '@/components/Table/TableWithPagination'
import MemberActions from './MemberActions'

export default function MembersTable({
  members,
  onRoleChange,
  isPending,
  onDeleteMember,
}) {
  const columns = ['USUARIO', 'EMAIL', 'ROL', 'ACCIONES']

  const renderRow = (member, index) => (
    <TableRow key={index}>
      <TableCell>
        <User username={member.username} />
      </TableCell>
      <TableCell>{member.email}</TableCell>
      <TableCell>
        <ChipByRole role={EVENT_ROLES_LABELS[member.role]} />
      </TableCell>
      <TableCell>
        <MemberActions
          member={member}
          onDeleteMember={onDeleteMember}
          onRoleChange={onRoleChange}
        />
      </TableCell>
    </TableRow>
  )

  return (
    <TableWithPagination
      columns={columns}
      completeItems={members}
      renderRow={renderRow}
    />
  )
}
