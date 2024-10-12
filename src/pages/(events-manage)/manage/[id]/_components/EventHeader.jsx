import { MotionH1 } from './Animation'
import ImageLogo from './ImageLogo'
import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import EventStatus from './EventStatus'

export default function EventHeader({
  event,
  isEditing,
  setIsEditing,
  logoFile,
  setLogoFile,
  publishEvent,
  updateStatusLoading,
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex justify-between items-center">
        <ImageLogo
          image={event.media.find((item) => item.name === 'main_image')}
          isEditing={isEditing}
          newLogoFile={logoFile}
          setLogoFile={setLogoFile}
        />
        <MotionH1 className="text-4xl font-bold px-2">{event.title}</MotionH1>
      </div>
      {!isEditing && (
        <div className="flex gap-2 items-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <EventStatus
            event={event}
            publishEvent={publishEvent}
            updateStatusLoading={updateStatusLoading}
          />
        </div>
      )}
    </div>
  )
}
