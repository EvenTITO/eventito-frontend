import { CalendarDays, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

export default function EventCalendar({
  event,
  isEditing,
  handleDateChange,
  datesOpen,
  handleDatesOpen,
}) {
  return (
    <div className="space-y-6 mb-12">
      <h2 className="text-2xl font-semibold">Calendario</h2>
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
                                { locale: es }
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
            {!isEditing && <Clock className="h-5 w-5 text-muted-foreground" />}
          </div>
        ))}
      </div>
    </div>
  )
}
