import {
  ATTENDEE_ROLE,
  EVENT_ROLES_LABELS,
  SPEAKER_ROLE,
} from '@/lib/Constants'
import { cn } from '@/lib/utils'
import { Card } from '../ui/card'

export default function InscriptionRoleSelector({
  label,
  role,
  setRole,
  speakerDisabled = false,
}) {
  const roles = [
    {
      id: ATTENDEE_ROLE,
      title: EVENT_ROLES_LABELS[ATTENDEE_ROLE],
      description: 'Acceso para asistir a las charlas',
      active: true,
    },
    {
      id: SPEAKER_ROLE,
      title: EVENT_ROLES_LABELS[SPEAKER_ROLE],
      description: 'Presentar trabajos en el evento',
      active: !speakerDisabled,
    },
    {
      id: ATTENDEE_ROLE + ',' + SPEAKER_ROLE,
      title:
        EVENT_ROLES_LABELS[SPEAKER_ROLE] +
        ' y ' +
        EVENT_ROLES_LABELS[ATTENDEE_ROLE],
      description: 'Presentar trabajos y asistir al evento',
      active: !speakerDisabled,
    },
  ]

  return (
    <div className="space-y-4">
      {label}
      {speakerDisabled ? (
        <p>
          No podrá ser autor porque el período de recepción de trabajos cerró.
        </p>
      ) : null}
      <div className="flex gap-4 w-full">
        {roles.map((type) => {
          if (!type.active) return null

          return (
            <Card
              key={type.id}
              className={cn(
                'p-4 border rounded-lg cursor-pointer transition-all w-full',
                role === type.id
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 hover:border-primary'
              )}
              onClick={() => setRole(type.id)}
            >
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{type.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">{type.description}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
