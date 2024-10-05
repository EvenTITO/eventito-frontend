import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  MapPin,
  Search,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import TalkDetails from './_components/TalkDetails'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import LineTabs from '@/components/LineTabs.jsx'
import { format, parse } from 'date-fns'
import { es } from 'date-fns/locale'

export default function ConferenceCalendar({ event, works }) {
  const [selectedWork, setSelectedWork] = useState(null)

  const handleTalkClick = (work) => {
    setSelectedWork(work)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseTalkDetails = () => {
    setSelectedWork(null)
    document.body.style.overflow = 'auto'
  }

  if (works.length === 0) {
    return (
      <ContainerPage>
        <TitlePage title={'Calendario de presentaciones'} />
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold mb-2">
            El calendario aún no está disponible
          </h2>
          <p className="text-gray-500 mb-4">Será publicado a la brevedad</p>
        </div>
      </ContainerPage>
    )
  }

  return (
    <ContainerPage>
      <div
        className={`max-w-6xl transition-all duration-300 ${selectedWork ? 'mr-[50vw]' : ''}`}
      >
        <div className="mb-6 flex flex-col">
          <TitlePage title={'Calendario de presentaciones'} />
        </div>
        <LineTabs
          tabs={[
            {
              label: 'Salas',
              component: getTalks(
                'rooms',
                works,
                selectedWork,
                event,
                handleTalkClick
              ),
            },
            {
              label: 'Fechas',
              component: getTalks(
                'dates',
                works,
                selectedWork,
                event,
                handleTalkClick
              ),
            },
          ]}
        />

        {selectedWork && (
          <TalkDetails work={selectedWork} onClose={handleCloseTalkDetails} />
        )}
      </div>
    </ContainerPage>
  )
}

function getTalks(tab, works, selectedWork, event, handleClick) {
  const [expanded, setExpanded] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocationName, setSelectedLocationName] =
    useState('ALL_LOCATIONS')
  const [selectedDate, setSelectedDate] = useState('ALL_DATES')

  const filteredWorks = works.filter((work) => {
    const queryCondition =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.abstract.toLowerCase().includes(searchQuery.toLowerCase())

    const datesCondition =
      selectedDate === 'ALL_DATES' ||
      format(new Date(work.talk.date), 'yyyy-MM-dd').toLocaleString() ===
        selectedDate
    const roomsCondition =
      selectedLocationName === 'ALL_LOCATIONS' ||
      work.talk.location === selectedLocationName
    if (tab === 'dates') {
      return queryCondition && datesCondition
    }
    return queryCondition && roomsCondition
  })

  const worksByLocation = filteredWorks.reduce((acc, work) => {
    if (!acc[work.talk.location]) {
      acc[work.talk.location] = []
    }
    acc[work.talk.location].push(work)
    return acc
  }, {})

  const worksByDate = filteredWorks.reduce((acc, work) => {
    const formatedDate = format(
      new Date(work.talk.date),
      'yyyy-MM-dd'
    ).toLocaleString()
    if (!acc[formatedDate]) {
      acc[formatedDate] = []
    }
    acc[formatedDate].push(work)
    return acc
  }, {})

  //ordeno por fecha las presentaciones dentro de cada locacion
  Object.keys(worksByLocation).forEach((location) => {
    worksByLocation[location].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )
  })

  //ordeno por fecha las presentaciones dentro de cada fecha
  Object.keys(worksByDate).forEach((date) => {
    worksByDate[date].sort((a, b) => new Date(a) - new Date(b))
  })

  //ordeno por fecha las fechas de las presentaciones
  const orderedWorksByDateEntries = Object.entries(worksByDate).sort(
    ([key1, work1], [key2, work2]) => new Date(key1) - new Date(key2)
  )

  //ordeno alfabeticamente las salas de las presentaciones
  const orderedWorksByLocationEntries = Object.entries(worksByLocation).sort(
    ([key1, work1], [key2, work2]) => key1 - key2
  )

  const groupedWorks =
    tab === 'dates' ? orderedWorksByDateEntries : orderedWorksByLocationEntries

  const toggle = (expandeable) => {
    setExpanded((prev) => ({
      ...prev,
      [expandeable]: !prev[expandeable],
    }))
  }

  const getDescription = (tab, event, name) => {
    if (tab === 'dates') {
      return null
    }
    const descriptions = event.mdata.rooms
      .filter((room) => room.name === name)
      .map((room) => room.description)
    return descriptions && descriptions.length > 0 ? descriptions[0] : null
  }

  const getName = (tab, event, name) => {
    if (tab === 'dates') {
      return format(parse(name, 'yyyy-MM-dd', new Date()), 'PPP', {
        locale: es,
      })
    }
    const descriptions = event.mdata.rooms
      .filter((room) => room.name === name)
      .map((room) => room.name)
    return descriptions && descriptions.length > 0 ? descriptions[0] : null
  }

  const getSpeakerName = (authors) => {
    const speakers = authors
      .filter((author) => author.is_speaker)
      .map((author) => author.full_name)
    return speakers && speakers.length > 0 ? speakers[0] : null
  }

  return (
    <div className="flex flex-row">
      <div className="lg:col-span-3 space-y-6 w-1/3 mr-2">
        {!selectedWork && (
          <Card className="lg:col-span-1 h-fit sticky top-8">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Presentaciónes
                </h2>
                <Input
                  type="text"
                  placeholder="título o abstract"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              {tab === 'dates' ? (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Fechas</h2>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      {works.map((work) => {
                        const formattedDate = format(
                          new Date(work.talk.date),
                          'yyyy-MM-dd'
                        ).toLocaleString()
                        return (
                          <SelectItem key={formattedDate} value={formattedDate}>
                            {formattedDate}
                          </SelectItem>
                        )
                      })}
                      <SelectItem value="ALL_DATES">
                        Selecciona una fecha
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Salas</h2>
                  <Select
                    value={selectedLocationName}
                    onValueChange={setSelectedLocationName}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona una sala" />
                    </SelectTrigger>
                    <SelectContent>
                      {event.mdata?.rooms.map((location) => (
                        <SelectItem key={location.name} value={location.name}>
                          {location.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="ALL_LOCATIONS">
                        Selecciona una sala
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <div className="lg:col-span-3 space-y-6 w-full">
        {groupedWorks.map(([key, work]) => (
          <Card key={key}>
            <CardContent className="p-6">
              <div
                className="flex items-center cursor-pointer p-2 bg-gray-100 rounded-md mb-4"
                onClick={() => toggle(key)}
              >
                {expanded[key] ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
                <div>
                  <h2 className="text-xl font-semibold ml-2">
                    {getName(tab, event, key) ?? ''}
                  </h2>
                  <h3 className="text-xs ml-2">
                    {getDescription(tab, event, key) ?? ''}
                  </h3>
                </div>
              </div>
              {expanded[key] && (
                <div className="space-y-4">
                  {work.map((work) => (
                    <div
                      key={work.id}
                      className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleClick(work)}
                    >
                      <h3 className="text-lg font-medium mb-2">{work.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {work.abstract}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={16} className="mr-2" />
                        {new Date(work.talk.date).toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin size={16} className="mr-2" />
                        {work.talk.location}
                      </div>
                      <div className="text-sm text-gray-500">
                        Presentador: {getSpeakerName(work.authors)}
                      </div>
                      <div className="text-sm text-gray-500">
                        Autores:{' '}
                        {work.authors.map((a) => a.full_name).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
