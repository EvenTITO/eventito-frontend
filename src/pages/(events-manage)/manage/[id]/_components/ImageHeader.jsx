export default function ImageHeader({ image }) {
  return (
    <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
      <img
        src={image.url}
        onError={(e) => {
          e.target.src =
            'https://cphfcrflaa.cloudimg.io/_bcuimages/academic-conference-primary-132249422941807450.jpg'
        }}
        className="w-full h-full object-cover"
      />
    </div>
  )
}
