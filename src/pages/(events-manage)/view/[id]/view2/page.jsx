import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import { Image } from '@nextui-org/image'
import { User } from '@nextui-org/user'

export default function Page({ eventInfo }) {
  return (
    <>
      <div className="h-[250px] w-full overflow-hidden">
        <Image
          shadow="sm"
          radius="none"
          width="100%"
          height="250px"
          alt={eventInfo.title}
          src={eventInfo.bannerURL}
          className="w-full h-[250px] object-cover"
        />
      </div>
      <ContainerPage>
        <User
          className="gap-4"
          name={<p className="text-3xl font-bold">{eventInfo.title}</p>}
          description={
            <p className="text-lg text-gray-600">
              {eventInfo.mdata?.short_description || eventInfo.shortDescrition}
            </p>
          }
          avatarProps={{
            src: eventInfo.logoURL,
            size: 'lg',
          }}
        />
      </ContainerPage>
    </>
  )
}
