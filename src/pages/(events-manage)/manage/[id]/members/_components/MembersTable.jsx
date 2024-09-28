import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ORGANIZER_ROLE,
  CHAIR_ROLE,
  EVENT_ROLES_LABELS,
} from "@/lib/Constants";
import { LoaderSpinner } from "@/components/Loader";

export default function MembersTable({ members, onRoleChange, isPending }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Listado de miembros</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <MembersPending />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {members.map((member, index) => (
              <Member
                member={member}
                index={index}
                onRoleChange={onRoleChange}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Member({ member, index, onRoleChange }) {
  return (
    <Card key={index} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.username}`}
            />
            <AvatarFallback>{member.username.charAt(0) || ""}</AvatarFallback>
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
            <SelectTrigger className="w-auto">
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
        </div>
      </CardContent>
    </Card>
  );
}

function MembersPending() {
  return (
    <div className="w-full items-center">
      <LoaderSpinner size={32} />
    </div>
  );
}
