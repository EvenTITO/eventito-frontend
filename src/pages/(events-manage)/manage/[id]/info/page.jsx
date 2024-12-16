import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import FilePicker from '@/components/Modal/FilePickerModal'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import { getBanner, getLogo } from './_components/utils'
import { useUploadEventImage } from '@/hooks/manage/generalHooks'

export default function Page({ eventInfo }) {
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
      </div>
    </ContainerPage>
  )
}
