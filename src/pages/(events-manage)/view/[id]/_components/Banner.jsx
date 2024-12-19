import ImageWrapper from '@/components/ImageWrapper'

export default function Banner({ title, bannerURL }) {
  const height = '270px'

  return (
    <div className={`h-[${height}] w-full overflow-hidden`}>
      <ImageWrapper
        src={bannerURL}
        title={title}
        height={height}
        width="100%"
        isZoomed={false}
      />
    </div>
  )
}
