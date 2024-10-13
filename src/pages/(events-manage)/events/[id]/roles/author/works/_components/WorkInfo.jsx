import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import StatCard from './StatCard'
import AddAuthorDialog from '../../_components/AddAuthorDialog'
import { onWorkEditDay } from './utils'
import { WORKS_STATUS_LABELS } from '@/lib/Constants.js'

export default function WorkInfo({ workData }) {
  console.log(workData)
  const isEditable = onWorkEditDay(workData)
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Estado"
          value={WORKS_STATUS_LABELS[workData.status]}
          icon="CheckCircle"
        />
        <StatCard
          title="En fecha de edición"
          value={isEditable ? 'Sí' : 'No'}
          icon="FileText"
        />
        <StatCard
          title={
            isEditable ? 'Fecha límite de entrega' : 'Última actualización'
          }
          value={
            isEditable
              ? new Date(workData.deadlineDate).toLocaleDateString()
              : new Date(workData.lastUpdate).toLocaleDateString()
          }
          icon="ClockIcon"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Autores</span>
            <AddAuthorDialog />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workData.authors.map((author, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-2 rounded-md transition-colors hover:bg-accent"
              >
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${author.full_name}`}
                  />
                  <AvatarFallback>
                    {author.full_name?.charAt(0) || ''}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-sm font-medium">{author.full_name}</p>
                  <p className="text-xs text-muted-foreground">{author.mail}</p>
                  <div className="flex gap-2 mt-1">
                    {author.is_main && (
                      <Badge variant="secondary">Principal</Badge>
                    )}
                    {author.is_speaker && (
                      <Badge variant="secondary">Orador</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Revisiones</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No hay revisiones disponibles en este momento.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
