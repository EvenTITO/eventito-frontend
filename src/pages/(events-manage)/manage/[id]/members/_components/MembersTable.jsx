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
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

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
              <Member
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

function RoleFilter({ currentFilter, onFilterChange }) {
  return (
    <>
      <Select
        value={currentFilter || ''}
        onValueChange={(value) => onFilterChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={CHAIR_ROLE}>
            {EVENT_ROLES_LABELS[CHAIR_ROLE]}
          </SelectItem>
          <SelectItem value={ORGANIZER_ROLE}>
            {EVENT_ROLES_LABELS[ORGANIZER_ROLE]}
          </SelectItem>
        </SelectContent>
      </Select>
      {currentFilter && (
        <Button
          variant="table"
          size="icon"
          onClick={() => onFilterChange(null)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Limpiar filtro</span>
        </Button>
      )}
    </>
  )
}

function Member({ member, index, onRoleChange, onDeleteMember }) {
  return (
    <Card key={index} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.username}`}
            />
            <AvatarFallback>{member.username.charAt(0) || ''}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="text-sm font-medium truncate">{member.username}</p>
            <p className="text-xs text-muted-foreground truncate">
              {member.email}
            </p>
          </div>
          <Select
            value={member.role}
            onValueChange={(newRole) => onRoleChange(member, newRole)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={CHAIR_ROLE}>
                {EVENT_ROLES_LABELS[CHAIR_ROLE]}
              </SelectItem>
              <SelectItem value={ORGANIZER_ROLE}>
                {EVENT_ROLES_LABELS[ORGANIZER_ROLE]}
              </SelectItem>
            </SelectContent>
          </Select>
          <DeleteButton onClick={() => onDeleteMember(member)} />
        </div>
      </CardContent>
    </Card>
  )
}

function MembersPending() {
  return (
    <div className="w-full flex justify-center items-center">
      <LoaderSpinner size={32} />
    </div>
  )
}
