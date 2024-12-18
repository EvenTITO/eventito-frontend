import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import Banner from './_components/Banner'
import TitleEvent from './_components/TitleEvent'
import CardWithoutFocus from '@/components/Card/CardWithoutFocus'

export default function Page({ eventInfo }) {
  return (
    <div className='space-y-6'>
      <Banner title={eventInfo.title} bannerURL={eventInfo.bannerURL} />
      <ContainerPage>
        <div className="space-y-10">
          <TitleEvent eventInfo={eventInfo} />
          <Metadatas
            location={eventInfo.location}
            contact={eventInfo.contact}
            organizedBy={eventInfo.organized_by}
          />
        </div>
      </ContainerPage>
    </div>
  )
}

function Metadatas({ location, contact, organizedBy }) {
  return (
    <div className="flex gap-4">
      <MetadataCard title={location} logo="MapPin" />
      <MetadataCard title={contact} logo="AtSign" />
      <MetadataCard title={organizedBy} logo="CircleUser" />
    </div>
  )
}

function MetadataCard({ title, logo }) {
  return (
    <CardWithoutFocus nameIcon={logo}>
      <div className="flex-grow">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
      </div>
    </CardWithoutFocus>
  )
}
