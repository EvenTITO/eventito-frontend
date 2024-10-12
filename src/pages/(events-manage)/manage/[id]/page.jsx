import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import {
  useEditEvent,
  useUpdateEventStatus,
  useUploadEventImage,
} from '@/hooks/manage/generalHooks'
import { STARTED_STATUS } from '@/lib/Constants.js'
import ContainerOrganizationPage from './_components/ContainerOrganizationPage'
import ImageHeader from './_components/ImageHeader'
import EventHeader from './_components/EventHeader'
import EventContent from './_components/EventContent'
import UploadStates from './_components/UploadStates'
import { MotionMain } from './_components/Animation'
import { useNavigate } from 'react-router-dom'

export default function Page({ eventInfo }) {
  const [event, setEvent] = useState({
    ...eventInfo,
    mdata: {
      ...eventInfo.mdata,
      short_description: eventInfo.mdata?.short_description || '',
    },
  })
  const [isEditing, setIsEditing] = useState(false)
  const [bannerFile, setBannerFile] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [datesOpen, setDatesOpen] = useState(event.dates.map(() => false))
  const { mutateAsync: submitEditEvent, isPending } = useEditEvent()
  const { mutateAsync: uploadEventImage } = useUploadEventImage()
  const { mutateAsync: updateEventStatus, isPending: updateStatusLoading } =
    useUpdateEventStatus()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'short_description') {
      setEvent((prev) => ({
        ...prev,
        mdata: {
          ...prev.mdata,
          short_description: value,
        },
      }))
    } else {
      setEvent((prev) => ({ ...prev, [name]: value }))
    }
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
    let eventCopy = { ...event }
    delete eventCopy.title
    await submitEditEvent({ eventData: eventCopy })
    if (bannerFile)
      await uploadEventImage({ imageName: 'banner_image', image: bannerFile })
    if (logoFile)
      await uploadEventImage({ imageName: 'main_image', image: logoFile })
    setIsEditing(false)
    setBannerFile(null)
    setLogoFile(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEvent({
      ...eventInfo,
      mdata: {
        ...eventInfo.mdata,
        short_description: eventInfo.mdata?.short_description || '',
      },
    })
    setBannerFile(null)
    setLogoFile(null)
  }

  const handleDatesOpen = (value, index) => {
    setDatesOpen(
      datesOpen.map((isOpen, idx) => (index === idx ? value : isOpen))
    )
  }

  const publishEvent = async () => {
    try {
      await updateEventStatus({ newStatus: STARTED_STATUS })
      toast({
        title: 'Publicación exitosa',
        description:
          'Publicación realizada satisfactoriamente. Todos los usuarios podrán inscribirse y enviar trabajos a tu evento.',
      })
      navigate('/home')
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
      <MotionMain>
        <EventHeader
          event={event}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          logoFile={logoFile}
          setLogoFile={setLogoFile}
          publishEvent={publishEvent}
          updateStatusLoading={updateStatusLoading}
        />
        <EventContent
          event={event}
          isEditing={isEditing}
          handleInputChange={handleInputChange}
          handleDateChange={handleDateChange}
          datesOpen={datesOpen}
          handleDatesOpen={handleDatesOpen}
        />
      </MotionMain>
      <UploadStates
        isEditing={isEditing}
        handleCancel={handleCancel}
        handleSave={handleSave}
        isPending={isPending}
      />
    </ContainerOrganizationPage>
  )
}
