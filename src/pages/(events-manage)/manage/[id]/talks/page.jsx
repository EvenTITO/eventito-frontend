import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SpeakersList from './_components/SpeakersList'
import CalendarView from './_components/CalendarView'
import SpeakerDialog from './_components/SpeakerDialog'
import { useChangeTalkForWork } from '@/hooks/manage/talksHooks'

export default function Page({ works, rooms }) {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null)
  const [selectedWork, setSelectedWork] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { mutateAsync: updateTalkForWork } = useChangeTalkForWork()

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker)
    setSelectedWork(null)
    setIsDialogOpen(true)
  }

  const handleWorkClick = (work) => {
    setSelectedWork(work)
    setSelectedSpeaker(work.speaker[0])
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedSpeaker(null)
    setSelectedWork(null)
  }

  const handleSaveWork = async (workId, track, talk) => {
    await updateTalkForWork({ workId, track, talk })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Asignación de Ubicaciones</h1>
      <Tabs defaultValue="speakers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="speakers">Presentadores</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>
        <TabsContent value="speakers">
          <SpeakersList works={works} onSpeakerClick={handleSpeakerClick} />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView
            works={works}
            rooms={rooms}
            onWorkClick={handleWorkClick}
          />
        </TabsContent>
      </Tabs>

      <SpeakerDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveWork}
        speaker={selectedSpeaker}
        selectedWork={selectedWork}
        rooms={rooms}
      />
    </div>
  )
}
