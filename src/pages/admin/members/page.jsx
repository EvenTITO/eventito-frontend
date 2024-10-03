import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { REGULAR, EVENT_CREATOR, ADMIN, EVENT_ROLES_LABELS } from './constants'

export default function Page({ members }) {
  const [filter, setFilter] = useState(null)

  const filteredMembers = filter
    ? members.filter((member) => member.role === filter)
    : members

  const title = filter
    ? `Members by role: ${EVENT_ROLES_LABELS[filter]}`
    : 'All Members'

  const handleRoleChange = (memberId, newRole) => {
    // In a real application, this would update the backend
    console.log(`Changed role for member ${memberId} to ${newRole}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="w-full mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <RoleFilter currentFilter={filter} onFilterChange={setFilter} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <Member
                key={member.id}
                member={member}
                onRoleChange={handleRoleChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RoleFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="flex items-center space-x-2">
      <Select
        value={currentFilter || ''}
        onValueChange={(value) => onFilterChange(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={REGULAR}>{EVENT_ROLES_LABELS[REGULAR]}</SelectItem>
          <SelectItem value={EVENT_CREATOR}>
            {EVENT_ROLES_LABELS[EVENT_CREATOR]}
          </SelectItem>
          <SelectItem value={ADMIN}>{EVENT_ROLES_LABELS[ADMIN]}</SelectItem>
        </SelectContent>
      </Select>
      {currentFilter && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onFilterChange(null)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear filter</span>
        </Button>
      )}
    </div>
  )
}

function Member({ member, onRoleChange }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.username}`}
            />
            <AvatarFallback>{member.username.charAt(0) || ''}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="text-lg font-medium truncate">{member.username}</p>
            <p className="text-sm text-muted-foreground truncate">
              {member.email}
            </p>
          </div>
          <Select
            value={member.role}
            onValueChange={(newRole) => onRoleChange(member.id, newRole)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={REGULAR}>
                {EVENT_ROLES_LABELS[REGULAR]}
              </SelectItem>
              <SelectItem value={EVENT_CREATOR}>
                {EVENT_ROLES_LABELS[EVENT_CREATOR]}
              </SelectItem>
              <SelectItem value={ADMIN}>{EVENT_ROLES_LABELS[ADMIN]}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
