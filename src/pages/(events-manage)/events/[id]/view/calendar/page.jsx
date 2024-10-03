import { useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Calendar,
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

export default function ConferenceCalendar({ talks, locationList }) {
  const [expandedLocations, setExpandedLocations] = useState({})
  const [selectedLocation, setSelectedLocation] = useState('Select all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTalk, setSelectedTalk] = useState(null)

  const filteredTalks = talks.filter(
    (talk) =>
      (selectedLocation === 'Select all' ||
        talk.location === selectedLocation) &&
      (talk.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        talk.abstract.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const talksByLocation = filteredTalks.reduce((acc, talk) => {
    if (!acc[talk.location]) {
      acc[talk.location] = []
    }
    acc[talk.location].push(talk)
    return acc
  }, {})

  Object.keys(talksByLocation).forEach((location) => {
    talksByLocation[location].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )
  })

  const toggleLocation = (location) => {
    setExpandedLocations((prev) => ({
      ...prev,
      [location]: !prev[location],
    }))
  }

  const handleTalkClick = (talk) => {
    setSelectedTalk(talk)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseTalkDetails = () => {
    setSelectedTalk(null)
    document.body.style.overflow = 'auto'
  }

  if (talks.length === 0 || talks === null) {
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
        className={`max-w-6xl transition-all duration-300 ${selectedTalk ? 'mr-[50vw]' : ''}`}
      >
        <TitlePage title={'Calendario de presentaciones'} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Card className="lg:col-span-1 h-fit sticky top-8">
            <CardContent className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Talks
                </h2>
                <Input
                  type="text"
                  placeholder="Search by title or abstract"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Filter by Location
                </h2>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationList.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            {Object.entries(talksByLocation).map(
              ([location, locationTalks]) => (
                <Card key={location}>
                  <CardContent className="p-6">
                    <div
                      className="flex items-center cursor-pointer p-2 bg-gray-100 rounded-md mb-4"
                      onClick={() => toggleLocation(location)}
                    >
                      {expandedLocations[location] ? (
                        <ChevronDown size={20} />
                      ) : (
                        <ChevronRight size={20} />
                      )}
                      <h2 className="text-xl font-semibold ml-2">{location}</h2>
                    </div>
                    {expandedLocations[location] && (
                      <div className="space-y-4">
                        {locationTalks.map((talk) => (
                          <div
                            key={talk.id}
                            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleTalkClick(talk)}
                          >
                            <h3 className="text-lg font-medium mb-2">
                              {talk.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {talk.abstract}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <Calendar size={16} className="mr-2" />
                              {new Date(talk.date).toLocaleString()}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin size={16} className="mr-2" />
                              {talk.location}
                            </div>
                            <div className="text-sm text-gray-500">
                              Presenter: {talk.authors[0].full_name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </div>

        {selectedTalk && (
          <TalkDetails talk={selectedTalk} onClose={handleCloseTalkDetails} />
        )}
      </div>
    </ContainerPage>
  )
}
