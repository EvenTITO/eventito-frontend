import Banner from '@/assets/banner_default.png'

export default function ImageHeader({ image }) {
  return (
    <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
      <img
        src={image ? image.url : Banner}
        onError={(e) => {
          e.target.src = Banner
        }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
