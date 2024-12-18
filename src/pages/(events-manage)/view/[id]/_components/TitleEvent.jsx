import { User } from '@nextui-org/user'

export default function TitleEvent({ eventInfo }) {
  return (
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
  )
}
