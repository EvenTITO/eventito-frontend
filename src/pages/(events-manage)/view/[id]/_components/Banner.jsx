import { Image } from '@nextui-org/image'

export default function Banner({ title, bannerURL }) {
  const height = '270px'

  return (
    <div className={`h-[${height}] w-full overflow-hidden`}>
      <Image
        shadow="sm"
        radius="none"
        width="100%"
        height={height}
        alt={title}
        src={bannerURL}
        className={`w-full h-[${height}] object-cover`}
      />
    </div>
  )
}
