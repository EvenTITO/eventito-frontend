import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import FilePicker from '@/components/Modal/FilePickerModal'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { getBanner, getLogo } from './_components/utils'
import { useEditEvent, useUploadEventImage } from '@/hooks/manage/generalHooks'
import DescriptionCard from './_components/DescriptionCard'

export default function Page({ eventInfo }) {
  const { mutateAsync: updateEvent } = useEditEvent()
  const { mutateAsync: uploadEventImage } = useUploadEventImage()

  async function handleUpdateImage(file, nameFile) {
    await uploadEventImage({ imageName: nameFile, image: file })
  }
  async function handleUpdateBanner(bannerFile) {
    await handleUpdateImage(bannerFile, 'banner_image')
  }
  async function handleUpdateLogo(logoFile) {
    await handleUpdateImage(logoFile, 'main_image')
  }

  async function updateDescription({ eventData }) {
    delete eventData.title
    await updateEvent({
      eventData,
    })
  }
  async function handleUpdateDescription(newDescription) {
    await updateDescription({
      eventData: {
        ...eventInfo,
        mdata: { ...eventInfo.mdata, description: newDescription },
      },
    })
  }
  async function handleUpdateShortDescription(newShortDescription) {
    await updateDescription({
      eventData: {
        ...eventInfo,
        mdata: { ...eventInfo.mdata, short_description: newShortDescription },
      },
    })
  }

  return (
    <ContainerPage>
      <div className="space-y-6">
        <TitlePage title={eventInfo.title} />
        <FilePicker
          title="Banner del evento"
          modalTitle="Seleccionar un banner para el evento"
          imageURL={getBanner(eventInfo)}
          onSave={handleUpdateBanner}
        />
        <FilePicker
          title="Logo del evento"
          modalTitle="Seleccionar un logo para el evento"
          imageURL={getLogo(eventInfo)}
          onSave={handleUpdateLogo}
        />
        <DescriptionCard
          title="Descripción corta del evento"
          descriptionText={
            eventInfo.mdata?.short_description || 'Sin descripción'
          }
          defaultValue={eventInfo.mdata?.short_description}
          handleUpdate={handleUpdateShortDescription}
        />
        <DescriptionCard
          title="Acerca del evento"
          descriptionText={eventInfo.mdata?.description || 'Sin descripción'}
          defaultValue={eventInfo.mdata?.description}
          handleUpdate={handleUpdateDescription}
        />
      </div>
    </ContainerPage>
  )
}
