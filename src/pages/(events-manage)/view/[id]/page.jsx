import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarDays, MapPin, Users, AtSign } from 'lucide-react'
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionMain,
  MotionP,
} from './_components/Animation'
import ContainerViewPage from './_components/ContainerViewPage'
import ImageHeader from './_components/ImageHeader'
import ImageLogo from './_components/ImageLogo.jsx'

export default function Page({ event }) {
  return (
    <ContainerViewPage>
      <ImageHeader
        image={event.media.find((item) => item.name === 'banner_image')}
      />
      <MotionMain>
        <MotionDiv className="space-y-6 mb-12">
          <MotionDiv className="flex flex-row items-center">
            <ImageLogo
              image={event.media.find((item) => item.name === 'main_image')}
            />
            <MotionH1 className="text-4xl font-bold px-2">
              {event.title}
            </MotionH1>
          </MotionDiv>
          <MotionDiv className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Organizado por: {event.organized_by}</span>
            </div>
          </MotionDiv>
          <MotionDiv className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </MotionDiv>
          {event.contact && (
            <MotionDiv className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <AtSign className="h-4 w-4 mr-2" />
                <span>Contacto: {event.contact}</span>
              </div>
            </MotionDiv>
          )}
          <MotionDiv className="space-y-2">
            {event.dates?.map((date, index) => (
              <MotionDiv
                key={index}
                className="flex items-center text-sm text-muted-foreground"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                <p className="font-medium">{date.description}:&nbsp;&nbsp;</p>
                <span>
                  {date.date &&
                    date.time &&
                    format(new Date(`${date.date}T${date.time}`), 'PPPP p', {
                      locale: es,
                    })}
                </span>
              </MotionDiv>
            ))}
          </MotionDiv>
        </MotionDiv>

        <MotionDiv className="prose max-w-none mb-12">
          <MotionH2 className="text-2xl font-semibold mb-4">
            Sobre el evento
          </MotionH2>
          <MotionP>{event.description}</MotionP>
        </MotionDiv>
      </MotionMain>
    </ContainerViewPage>
  )
}
