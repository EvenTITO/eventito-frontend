import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DeleteButton } from '@/components/ui/deleteButton'
import { ORGANIZER_ROLE, CHAIR_ROLE, EVENT_ROLES_LABELS } from '@/lib/Constants'
import { LoaderSpinner } from '@/components/Loader'
import { useState } from 'react'
import RoleFilter from './RoleFilter'
import MemberItem from './MemberItem'

export default function MembersTable({
  members,
  onRoleChange,
  isPending,
  onDeleteMember,
}) {
  const [filter, setFilter] = useState(null)

  const filteredMembers = filter
    ? members.filter((member) => member.role === filter)
    : members

  const title = filter
    ? `Listado de miembros por rol: ${EVENT_ROLES_LABELS[filter]}`
    : 'Listado de miembros'

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center space-x-2">
            {isPending ? (
              <LoaderSpinner size={32} />
            ) : (
              <RoleFilter currentFilter={filter} onFilterChange={setFilter} />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isPending ? (
          <div className="grid gap-6">
            {filteredMembers.map((member, index) => (
              <MemberItem
                key={member.email}
                member={member}
                index={index}
                onRoleChange={onRoleChange}
                onDeleteMember={onDeleteMember}
              />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
