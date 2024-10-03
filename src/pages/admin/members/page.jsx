import { useState, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, Users, Filter, Search } from 'lucide-react'
import { REGULAR, EVENT_CREATOR, ADMIN, EVENT_ROLES_LABELS } from './constants'
import { useAdminUpdateUserRole } from '@/hooks/admin/adminUsersHooks'
import ContainerAdminPage from '../_components/ContainerAdminPage'
import { LoaderSpinner } from '@/components/Loader'

export default function Page({ members }) {
  const [filter, setFilter] = useState(null)
  const [search, setSearch] = useState('')

  const { mutateAsync: updateRole, isPending, error } = useAdminUpdateUserRole()

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        (filter ? member.role === filter : true) &&
        (search
          ? member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.lastname.toLowerCase().includes(search.toLowerCase()) ||
            er.email.toLowerCase().includes(search.toLowerCase())
          : true)
    )
  }, [members, filter, search])

  const title = filter
    ? `Miembros con rol: ${EVENT_ROLES_LABELS[filter]}`
    : 'Todos los miembros'

  const handleRoleChange = async (memberId, newRole) => {
    await updateRole({ userId: memberId, newRole: newRole })
  }

  return (
    <ContainerAdminPage
      title={'Administración de miembros'}
      subtitle={'Cambiar los roles de los usuarios de eventito.'}
      icon={'Users'}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="lg:col-span-1 h-fit sticky top-8">
          <CardContent className="p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="h-5 w-5" />
                Buscar miembros
              </h2>
              <Input
                type="text"
                placeholder="Buscar por nombre o email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtrar por rol
              </h2>
              <RoleFilter currentFilter={filter} onFilterChange={setFilter} />
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                <span className="flex items-center gap-3">{title}</span>
                {!isPending ? (
                  <span className="text-sm font-normal text-muted-foreground">
                    {filteredMembers.length} miembro
                    {filteredMembers.length !== 1 && 's'}
                  </span>
                ) : (
                  <LoaderSpinner size={32} />
                )}
              </h2>
              {!isPending ? (
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <Member
                      key={member.id}
                      member={member}
                      onRoleChange={handleRoleChange}
                    />
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </ContainerAdminPage>
  )
}

function RoleFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="space-y-4">
      <Select
        value={currentFilter || ''}
        onValueChange={(value) => onFilterChange(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Seleccionar un rol" />
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
          className="w-full"
          onClick={() => onFilterChange(null)}
        >
          <X className="h-4 w-4 mr-2" />
          Limpiar filtro
        </Button>
      )}
    </div>
  )
}

function Member({ member, onRoleChange }) {
  member.username = member.name + ' ' + member.lastname

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 group">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200">
            <AvatarImage
              src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.username}`}
            />
            <AvatarFallback>{member.username.charAt(0) || ''}</AvatarFallback>
          </Avatar>
          <div className="flex-grow min-w-0">
            <p className="text-xl font-medium truncate group-hover:text-primary transition-colors duration-200">
              {member.username}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {member.email}
            </p>
          </div>
          <Select
            value={member.role}
            onValueChange={(newRole) => onRoleChange(member.id, newRole)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Change role" />
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
