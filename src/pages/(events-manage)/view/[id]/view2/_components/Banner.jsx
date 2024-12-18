import { Image } from '@nextui-org/image'

export default function Banner({ title, bannerURL }) {
  return (
    <div className="h-[250px] w-full overflow-hidden">
      <Image
        shadow="sm"
        radius="none"
        width="100%"
        height="250px"
        alt={title}
        src={bannerURL}
        className="w-full h-[250px] object-cover"
      />
    </div>
  )
}
