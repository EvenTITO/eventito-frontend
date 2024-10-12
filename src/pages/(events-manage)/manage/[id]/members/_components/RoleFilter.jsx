import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ORGANIZER_ROLE, CHAIR_ROLE, EVENT_ROLES_LABELS } from '@/lib/Constants'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export default function RoleFilter({ currentFilter, onFilterChange }) {
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
