import { useState } from 'react'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, Clock, Edit2, MapPin, Users, AtSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionMain,
  MotionP,
} from './_components/Animation'
import { CREATED_STATUS, STARTED_STATUS } from '@/lib/Constants.js'
import { useToast } from '@/hooks/use-toast'
import ContainerOrganizationPage from './_components/ContainerOrganizationPage'
import ImageHeader from './_components/ImageHeader'
import ImageLogo from './_components/ImageLogo'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import {
  useEditEvent,
  useUpdateEventStatus,
  useUploadEventImage,
} from '@/hooks/manage/generalHooks'
import { canStartEvent } from '@/lib/utils.js'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function Page({ eventInfo }) {
  const [event, setEvent] = useState(eventInfo)
  const [isEditing, setIsEditing] = useState(false)
  const [bannerFile, setBannerFile] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [datesOpen, setDatesOpen] = useState(event.dates.map(() => false))
  const { mutateAsync: submitEditEvent, isPending, error } = useEditEvent()
  const { mutateAsync: uploadEventImage } = useUploadEventImage()
  const { mutateAsync: updateEventStatus } = useUpdateEventStatus()
  const { toast } = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEvent((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (index, field, value) => {
    setEvent((prev) => ({
      ...prev,
      dates: prev.dates.map((date, i) =>
        i === index ? { ...date, [field]: value } : date
      ),
    }))
  }

  const handleSave = async () => {
    let eventCopy = JSON.parse(JSON.stringify(event))
    delete eventCopy.title
    await submitEditEvent({ eventData: eventCopy })
    if (bannerFile) {
      await uploadEventImage({ imageName: 'banner_image', image: bannerFile })
    }
    if (logoFile) {
      await uploadEventImage({ imageName: 'main_image', image: logoFile })
    }
    setIsEditing(false)
    setBannerFile(null)
    setLogoFile(null)
  }

  const handleDatesOpen = async (value, index) => {
    setDatesOpen(
      datesOpen.map((isOpen, idx) => (index === idx ? value : isOpen))
    )
  }

  const publishEvent = async () => {
    const newStatus = STARTED_STATUS
    try {
      await updateEventStatus({ newStatus })
      toast({
        title: 'Publicación exitosa',
        description:
          'Publicación realizada satisfactoriamente. Todos los usuarios podrán inscribirse y enviar trabajos a tu evento.',
      })
    } catch (error) {
      toast({
        title: 'Publicación fallida',
        description: error.response.data.detail,
      })
    }
  }

  return (
    <ContainerOrganizationPage>
      <ImageHeader
        image={event.media.find((item) => item.name === 'banner_image')}
        isEditing={isEditing}
        newBannerFile={bannerFile}
        setBannerFile={setBannerFile}
      />
      <MotionMain className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex justify-between items-center">
            <ImageLogo
              image={event.media.find((item) => item.name === 'main_image')}
              isEditing={isEditing}
              newLogoFile={logoFile}
              setLogoFile={setLogoFile}
            />
            <MotionH1 className="text-4xl font-bold px-2">
              {event.title}
            </MotionH1>
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
              ></EventStatus>
            </div>
          )}
        </div>

        <MotionDiv className="space-y-4 mb-12">
          {isEditing ? (
            <div className="flex flex-col sm:flex-row text-sm gap-4">
              <div className="flex flex-col sm:gap-8 my-2">
                <div className="flex flex-row items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground mr-2 text-nowrap">
                    Organizado por:
                  </span>
                </div>
                <div className="flex flex-row items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Ubicación:</span>
                </div>
                <div className="flex flex-row items-center">
                  <AtSign className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">Contacto:</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-col justify-between w-full gap-2">
                <div className="flex items-center w-full">
                  <Input
                    name="organized_by"
                    value={event.organized_by}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Ingresar persona, grupo u organizacion a cargo del evento"
                  />
                </div>
                <div className="flex items-center w-full">
                  <Input
                    name="location"
                    value={event.location}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Ingresar la ubicacion del evento"
                  />
                </div>
                <div className="flex items-center w-full">
                  <Input
                    name="contact"
                    value={event.contact}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Ingresar un email de contacto público"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-col sm:items-start gap-4 text-sm">
              <div className="flex items-center w-full">
                <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>
                  <span className="text-muted-foreground">Organizado por:</span>{' '}
                  {event.organized_by}
                </span>
              </div>
              <div className="flex items-center w-full">
                <MapPin className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                <span className="break-words">
                  <span className="text-muted-foreground">Ubicación:</span>{' '}
                  {event.location}
                </span>
              </div>
              <div className="flex items-center w-full">
                <AtSign className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
                <span className="break-words">
                  <span className="text-muted-foreground">Contacto:</span>{' '}
                  {event.contact}
                </span>
              </div>
            </div>
          )}
        </MotionDiv>

        <MotionDiv className="space-y-6 mb-12">
          <MotionH2 className="text-2xl font-semibold">Calendario</MotionH2>
          <div className="space-y-4">
            {event.dates.map((date, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">{date.description}</p>
                    {isEditing ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <Popover
                          open={datesOpen[index]}
                          onOpenChange={(v) => handleDatesOpen(v, index)}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[240px] justify-start text-left font-normal"
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {date.date
                                ? format(
                                    parse(date.date, 'yyyy-MM-dd', new Date()),
                                    'PPP',
                                    {
                                      locale: es,
                                    }
                                  )
                                : 'Seleccionar una fecha'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                date.date
                                  ? parse(date.date, 'yyyy-MM-dd', new Date())
                                  : undefined
                              }
                              onSelect={(newDate) => {
                                handleDateChange(
                                  index,
                                  'date',
                                  newDate ? format(newDate, 'yyyy-MM-dd') : ''
                                )
                                handleDatesOpen(false, index)
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="time"
                          value={date.time}
                          onChange={(e) =>
                            handleDateChange(index, 'time', e.target.value)
                          }
                          className="w-[120px]"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {date.date
                          ? format(
                              parse(date.date, 'yyyy-MM-dd', new Date()),
                              'PPP',
                              { locale: es }
                            )
                          : 'Seleccionar una fecha'}
                      </p>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv className="prose max-w-none mb-12">
          <MotionH2 className="text-2xl font-semibold mb-4">
            Sobre el evento
          </MotionH2>
          {isEditing ? (
            <Textarea
              name="description"
              value={event.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full border-none shadow-none focus-visible:ring-0 px-0 resize-none"
            />
          ) : (
            <MotionP>{event.description}</MotionP>
          )}
        </MotionDiv>

        {isEditing && (
          <div className="bg-background border-t p-4 gap-2 flex justify-end">
            <ButtonWithLoading
              onClick={() => {
                setIsEditing(false)
                setEvent(eventInfo)
                setBannerFile(null)
                setLogoFile(null)
              }}
              className={'size-lg'}
            >
              Cancelar
            </ButtonWithLoading>
            <ButtonWithLoading
              onClick={handleSave}
              className={'size-lg'}
              isLoading={isPending}
            >
              Guardar cambios
            </ButtonWithLoading>
          </div>
        )}
      </MotionMain>
    </ContainerOrganizationPage>
  )
}

function EventStatus({ event, publishEvent }) {
  if (event.status !== CREATED_STATUS) {
    return null
  }
  const canPublishEvent = canStartEvent(event)
  return (
    <>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <span>
              <Button
                size="sm"
                onClick={publishEvent}
                disabled={!canPublishEvent}
              >
                Publicar el evento
              </Button>
            </span>
          </Tooltip.Trigger>
          {!canPublishEvent && (
            <Tooltip.Content
              side="top"
              align="center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backdropFilter: 'blur(4px)',
                zIndex: 1000,
                maxWidth: '200px',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
              }}
            >
              {'Para poder hacer el evento publico se deben completar las ' +
                'fechas obligatorias y definir al menos un track y una tarifa.'}
            </Tooltip.Content>
          )}
        </Tooltip.Root>
      </Tooltip.Provider>
    </>
  )
}
