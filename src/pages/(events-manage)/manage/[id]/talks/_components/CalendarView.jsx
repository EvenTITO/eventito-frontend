import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import WeekView from './WeekView'

export default function CalendarView({ works, rooms, onWorkClick }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedRoom, setSelectedRoom] = useState('all')
  const [view, setView] = useState('week')
  const [startHour, setStartHour] = useState(0)
  const [endHour, setEndHour] = useState(23)

  const filteredWorks = works.filter(
    (work) =>
      work.talk &&
      (selectedRoom === 'all' || work.talk.location === selectedRoom)
  )

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayWorks = filteredWorks.filter(
        (work) =>
          new Date(work.talk.date).toDateString() === date.toDateString()
      )
      return (
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold">{date.getDate()}</span>
          {dayWorks.length > 0 && (
            <div className="h-2 w-2 bg-blue-500 rounded-full mt-1"></div>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setView('month')}
            variant={view === 'month' ? 'default' : 'outline'}
          >
            Mes
          </Button>
          <Button
            onClick={() => setView('week')}
            variant={view === 'week' ? 'default' : 'outline'}
          >
            Semana
          </Button>
        </div>
        <Select value={selectedRoom} onValueChange={setSelectedRoom}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar sala" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las salas</SelectItem>
            {rooms.map((room) => (
              <SelectItem key={room} value={room}>
                {room.length > 20 ? room.substring(0, 20) + '...' : room}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setSelectedDate((prev) => {
              const newDate = new Date(prev)
              newDate.setDate(newDate.getDate() - (view === 'week' ? 7 : 30))
              return newDate
            })
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold">
          {selectedDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setSelectedDate((prev) => {
              const newDate = new Date(prev)
              newDate.setDate(newDate.getDate() + (view === 'week' ? 7 : 30))
              return newDate
            })
          }
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {view === 'week' && (
        <div className="mb-4 flex justify-between items-center">
          <Select
            value={startHour}
            onValueChange={(value) => setStartHour(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Hora inicio" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem
                  key={i}
                  value={i}
                >{`${i.toString().padStart(2, '0')}:00`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>a</span>
          <Select
            value={endHour}
            onValueChange={(value) => setEndHour(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Hora fin" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => (
                <SelectItem
                  key={i}
                  value={i}
                >{`${i.toString().padStart(2, '0')}:00`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {view === 'month' ? (
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
          onClickDay={(value) => {
            setSelectedDate(value)
            setView('week')
          }}
          className="w-full bg-white rounded-lg shadow p-4"
        />
      ) : (
        <WeekView
          selectedDate={selectedDate}
          filteredWorks={filteredWorks}
          startHour={startHour}
          endHour={endHour}
          onWorkClick={onWorkClick}
        />
      )}
    </div>
  )
}
