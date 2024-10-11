import { Fragment, useEffect, useState, useMemo } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Dialog, Transition } from '@headlessui/react'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Component() {
  const [works, setWorks] = useState([])
  const [locations, setLocations] = useState([])
  const [tracks, setTracks] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [idToDelete, setIdToDelete] = useState(null)
  const [newEvent, setNewEvent] = useState({
    id: '',
    title: '',
    authorEmail: '',
    location: '',
    startDate: '',
    endDate: '',
    track: '',
  })
  const [filterLocation, setFilterLocation] = useState('')
  const [filterTrack, setFilterTrack] = useState('')

  // Mock data - replace with actual API calls
  useEffect(() => {
    setWorks([
      {
        id: '1',
        title: 'Work 1',
        authorEmail: 'author1@example.com',
        location: 'Room A',
        startDate: '2023-10-01',
        endDate: '2023-10-02',
        track: 'Track 1',
      },
      {
        id: '2',
        title: 'Work 2',
        authorEmail: 'author2@example.com',
        location: 'Room B',
        startDate: '2023-10-03',
        endDate: '2023-10-04',
        track: 'Track 2',
      },
    ])
    setLocations([
      { id: '1', name: 'Room A' },
      { id: '2', name: 'Room B' },
    ])
    setTracks([
      { id: '1', name: 'Track 1' },
      { id: '2', name: 'Track 2' },
    ])
  }, [])

  useEffect(() => {
    setAllEvents(
      works.map((work) => ({
        id: work.id,
        title: work.title,
        start: work.startDate,
        end: work.endDate,
        extendedProps: {
          authorEmail: work.authorEmail,
          location: work.location,
          track: work.track,
        },
      }))
    )
  }, [works])

  const filteredEvents = useMemo(() => {
    return allEvents.filter(
      (event) =>
        (!filterLocation || event.extendedProps.location === filterLocation) &&
        (!filterTrack || event.extendedProps.track === filterTrack)
    )
  }, [allEvents, filterLocation, filterTrack])

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el')
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title')
          let id = eventEl.getAttribute('data')
          return { title, id }
        },
      })
    }
  }, [works])

  function handleDateClick(arg) {
    setNewEvent({
      ...newEvent,
      startDate: arg.dateStr,
      endDate: arg.dateStr,
      id: new Date().getTime().toString(),
    })
    setShowModal(true)
  }

  function addEvent(data) {
    const work = {
      id: new Date().getTime().toString(),
      title: data.draggedEl.innerText,
      authorEmail: '',
      location: '',
      startDate: data.date.toISOString(),
      endDate: data.date.toISOString(),
      track: '',
    }
    setWorks([...works, work])
  }

  function handleDeleteModal(data) {
    setShowDeleteModal(true)
    setIdToDelete(data.event.id)
  }

  function handleDelete() {
    setWorks(works.filter((work) => work.id !== idToDelete))
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  function handleCloseModal() {
    setShowModal(false)
    setNewEvent({
      id: '',
      title: '',
      authorEmail: '',
      location: '',
      startDate: '',
      endDate: '',
      track: '',
    })
    setShowDeleteModal(false)
    setIdToDelete(null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setWorks([...works, newEvent])
    handleCloseModal()
  }

  const getEventColor = (location) => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1']
    const index =
      locations.findIndex((loc) => loc.name === location) % colors.length
    return colors[index]
  }

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Calendar</h1>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full mb-8">
          <div className="flex space-x-4">
            <Select
              value={filterLocation}
              onValueChange={(value) => setFilterLocation(value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Select>
            <Select
              value={filterTrack}
              onValueChange={(value) => setFilterTrack(value)}
            >
              <option value="">All Tracks</option>
              {tracks.map((track) => (
                <option key={track.id} value={track.name}>
                  {track.name}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-10 w-full">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'resourceTimelineWook, dayGridMonth,timeGridWeek',
              }}
              events={filteredEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
              eventContent={(eventInfo) => (
                <div
                  style={{
                    backgroundColor: getEventColor(
                      eventInfo.event.extendedProps.location
                    ),
                    padding: '2px',
                    borderRadius: '3px',
                  }}
                >
                  <b>{eventInfo.timeText}</b>
                  <i>{eventInfo.event.title}</i>
                </div>
              )}
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 bg-violet-50"
          >
            <h1 className="font-bold text-lg text-center">Drag Event</h1>
            {works.map((work) => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-white"
                title={work.title}
                key={work.id}
              >
                {work.title}
              </div>
            ))}
          </div>
        </div>

        <Transition.Root show={showDeleteModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={setShowDeleteModal}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          {/* Add an icon here if desired */}
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Event
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete this event?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        type="button"
                        variant="destructive"
                        className="inline-flex w-full justify-center sm:ml-3 sm:w-auto"
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        {/* Add an icon here if desired */}
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Add Event
                        </Dialog.Title>
                        <form onSubmit={handleSubmit} className="mt-2">
                          <Input
                            type="text"
                            value={newEvent.title}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                title: e.target.value,
                              })
                            }
                            placeholder="Title"
                            className="mb-2"
                          />
                          <Input
                            type="email"
                            value={newEvent.authorEmail}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                authorEmail: e.target.value,
                              })
                            }
                            placeholder="Author Email"
                            className="mb-2"
                          />
                          <Select
                            value={newEvent.location}
                            onValueChange={(value) =>
                              setNewEvent({ ...newEvent, location: value })
                            }
                            className="mb-2"
                          >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                              <option key={location.id} value={location.name}>
                                {location.name}
                              </option>
                            ))}
                          </Select>
                          <Select
                            value={newEvent.track}
                            onValueChange={(value) =>
                              setNewEvent({ ...newEvent, track: value })
                            }
                            className="mb-2"
                          >
                            <option value="">Select Track</option>

                            {tracks.map((track) => (
                              <option key={track.id} value={track.name}>
                                {track.name}
                              </option>
                            ))}
                          </Select>
                          <Input
                            type="date"
                            value={newEvent.startDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                startDate: e.target.value,
                              })
                            }
                            className="mb-2"
                          />
                          <Input
                            type="date"
                            value={newEvent.endDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                endDate: e.target.value,
                              })
                            }
                            className="mb-2"
                          />
                          <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <Button
                              type="submit"
                              disabled={
                                !newEvent.title ||
                                !newEvent.location ||
                                !newEvent.track
                              }
                              className="inline-flex w-full justify-center sm:col-start-2"
                            >
                              Create
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleCloseModal}
                              className="mt-3 inline-flex w-full justify-center sm:col-start-1 sm:mt-0"
                            >
                              Cancel
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  )
}
