import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectItem } from '@nextui-org/select'
import { ORGANIZER_ROLE, CHAIR_ROLE, EVENT_ROLES_LABELS } from '@/lib/Constants'
import { Button } from '@nextui-org/button'
import { X } from 'lucide-react'
import User from '@/components/ui/User'

export default function MemberItem({
  member,
  index,
  onRoleChange,
  onDeleteMember,
}) {
  return (
    <Card key={index} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <User username={member.username} email={member.email} />
          <div className="flex items-center">
            <Select
              variant="bordered"
              key={member.role}
              onChange={(newRole) => onRoleChange(newRole)}
              defaultSelectedKeys={[member.role]}
              className="w-[180px]"
            >
              <SelectItem key={CHAIR_ROLE}>
                {EVENT_ROLES_LABELS[CHAIR_ROLE]}
              </SelectItem>
              <SelectItem key={ORGANIZER_ROLE}>
                {EVENT_ROLES_LABELS[ORGANIZER_ROLE]}
              </SelectItem>
            </Select>
            <Button
              isIconOnly
              variant="light"
              aria-label="Eliminar miembro"
              onClick={() => onDeleteMember(member)}
              className="text-slate-500 text-base"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
