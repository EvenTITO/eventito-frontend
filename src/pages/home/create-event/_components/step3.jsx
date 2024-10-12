import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon } from 'lucide-react'
import { format } from '@formkit/tempo'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { Container } from './container'
import { BottomContainer } from './bottomContainer'
import { useSelector } from 'react-redux'
import SubmitButton from './SubmitButton'

const MAX_LOCATION_LENGTH = 100

export default function CreateEventStep3({ step, setStep }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [location, setLocation] = useState(null)
  const { event_type: eventType } = useSelector((state) => state.createEvent)

  if (step === 3) {
    return (
      <>
        <Container>
          <form className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">
                Paso 3/3: informacion adicional
              </h2>
              <div className="space-y-4">
                <DatePicker
                  label="Fecha de inicio"
                  date={startDate}
                  setDate={(date) => {
                    if (endDate && endDate < date) {
                      // dont allow endDate to be before startDate.
                      setEndDate(date)
                    }
                    setStartDate(date)
                  }}
                  disabledDates={(date) => date < new Date()}
                />

                {eventType === 'conference' && (
                  <DatePicker
                    label="Fecha de finalizacion"
                    date={endDate}
                    setDate={setEndDate}
                    disabledDates={(date) => {
                      if (startDate) {
                        return date < startDate
                      }
                      return date < new Date()
                    }}
                    defaultMonth={startDate}
                  />
                )}

                <div>
                  <Label htmlFor="location">Ubicacion</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ingresar la ubicacion del evento"
                    maxLength={MAX_LOCATION_LENGTH}
                  />
                  {location?.length > 0.9 * MAX_LOCATION_LENGTH && (
                    <p className="text-sm text-gray-500">
                      {location.length}/{MAX_LOCATION_LENGTH}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Container>
        <BottomContainer>
          <Button variant="outline" onClick={() => setStep(2)}>
            Atras
          </Button>
          <SubmitButton
            startDate={startDate}
            endDate={endDate}
            location={location}
          />
        </BottomContainer>
      </>
    )
  } else {
    return null
  }
}

function DatePicker({ date, setDate, label, disabledDates, defaultMonth }) {
  return (
    <div>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'full') : <span>Seleccionar fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={disabledDates}
            defaultMonth={date ? date : defaultMonth}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
