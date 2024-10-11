import React, { useEffect, useRef, useState } from 'react'
import { createCalendar, createViewMonthGrid } from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const roomColors = {
  'Room A': '#FF5733',
  'Room B': '#33FF57',
  'Room C': '#3357FF',
  'Room D': '#FF33F5',
  'Room E': '#33FFF5',
}

export default function AdvancedCalendar({
  works,
  rooms,
  eventStartDate,
  onEventUpdate,
}) {
  const [selectedRooms, setSelectedRooms] = useState(rooms)
  const [currentView, setCurrentView] = useState('week')
  const calendarRef = useRef(null)
  const calendarInstanceRef = useRef(null)

  useEffect(() => {
    if (calendarRef.current && !calendarInstanceRef.current) {
      const events = works
        .filter((work) => selectedRooms.includes(work.talk.location))
        .map((work) => ({
          id: work.id,
          title: work.title,
          start: work.talk.date,
          end: new Date(
            new Date(work.talk.date).getTime() + 60 * 60 * 1000
          ).toISOString(), // Assuming 1 hour duration
          color: roomColors[work.talk.location] || '#999',
          extendedProps: {
            location: work.talk.location,
            speaker: work.speaker[0].full_name,
          },
        }))

      calendarInstanceRef.current = createCalendar({
        target: calendarRef.current,
        views: [createViewMonthGrid()],
        events: events,
        defaultView: 'week',
        plugins: {
          dragAndDrop: true,
        },
        eventDurationEditable: false,
        dateClick: (info) => {
          console.log('Clicked on: ', info.dateStr)
        },
        eventClick: (info) => {
          console.log('Clicked event: ', info.event.title)
        },
        eventDrop: (info) => {
          const updatedWork = works.find((w) => w.id === info.event.id)
          if (updatedWork) {
            const newWork = {
              ...updatedWork,
              talk: {
                ...updatedWork.talk,
                date: info.event.start,
                location: info.event.extendedProps.location,
              },
            }
            onEventUpdate(newWork)
          }
        },
      })

      calendarInstanceRef.current.setDate(new Date(eventStartDate))
    }

    return () => {
      if (calendarInstanceRef.current) {
        calendarInstanceRef.current.destroy()
        calendarInstanceRef.current = null
      }
    }
  }, [works, selectedRooms, eventStartDate, onEventUpdate])

  useEffect(() => {
    if (calendarInstanceRef.current) {
      const events = works
        .filter((work) => selectedRooms.includes(work.talk.location))
        .map((work) => ({
          id: work.id,
          title: work.title,
          start: work.talk.date,
          end: new Date(
            new Date(work.talk.date).getTime() + 60 * 60 * 1000
          ).toISOString(), // Assuming 1 hour duration
          color: roomColors[work.talk.location] || '#999',
          extendedProps: {
            location: work.talk.location,
            speaker: work.speaker[0].full_name,
          },
        }))
      calendarInstanceRef.current.setEvents(events)
    }
  }, [works, selectedRooms])

  const handleRoomFilter = (room) => {
    setSelectedRooms((prev) =>
      prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
    )
  }

  const handleViewChange = (view) => {
    setCurrentView(view)
    if (calendarInstanceRef.current) {
      calendarInstanceRef.current.setView(view)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <Button
            key={room}
            onClick={() => handleRoomFilter(room)}
            variant={selectedRooms.includes(room) ? 'default' : 'outline'}
            style={{
              backgroundColor: selectedRooms.includes(room)
                ? roomColors[room]
                : 'transparent',
            }}
          >
            {room}
          </Button>
        ))}
      </div>
      <Select value={currentView} onValueChange={handleViewChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Day</SelectItem>
          <SelectItem value="week">Week</SelectItem>
          <SelectItem value="month">Month</SelectItem>
        </SelectContent>
      </Select>
      <div ref={calendarRef} style={{ height: '600px' }}></div>
    </div>
  )
}
