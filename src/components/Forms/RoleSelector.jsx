import { CHAIR_ROLE, ORGANIZER_ROLE } from '@/lib/Constants'
import { Select, SelectItem } from '@nextui-org/select'

export default function RoleSelector({
  setRole,
  label = 'Seleccionar rol',
  placeholder = null,
  labelPlacement = 'inside',
}) {
  return (
    <Select
      label={label}
      placeholder={placeholder}
      onChange={(e) => setRole(e.target.value)}
      labelPlacement={labelPlacement}
    >
      <SelectItem key={ORGANIZER_ROLE}>Organizador</SelectItem>
      <SelectItem key={CHAIR_ROLE}>Chair</SelectItem>
    </Select>
  )
}
