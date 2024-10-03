import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings } from 'lucide-react'
import { ADMIN_EVENTITO_ROLE } from '@/lib/Constants.js'

export default function RoleSelector({
  userRole,
  handleModeChange,
  isAdminPage,
}) {
  if (userRole !== ADMIN_EVENTITO_ROLE) {
    return (
      <div className="w-[180px] ml-2 border-none focus:ring-0">
        <span className="flex items-center">eventito</span>
      </div>
    )
  }

  return (
    <Select
      onValueChange={handleModeChange}
      value={isAdminPage ? 'admin' : 'regular'}
    >
      <SelectTrigger
        className={`w-[180px] ml-2 border-none focus:ring-0 bg-elegant ${isAdminPage ? 'text-yellow-200' : ''}`}
      >
        <SelectValue placeholder="eventito" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="regular">
          <span className="flex items-center">eventito</span>
        </SelectItem>
        <SelectItem value="admin" style={{ color: 'black' }}>
          <span className="flex items-center font-semibold">
            <Settings className="w-4 h-4 mr-2" />
            Administrador
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
