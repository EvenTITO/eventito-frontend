import { useRef } from 'react'
import Banner from '@/assets/banner_default.png'

export default function ImageHeader({
  image,
  isEditing,
  newBannerFile,
  setBannerFile,
}) {
  const showImagePicker = useRef(null)

  const handleClick = () => {
    showImagePicker.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0])
    }
  }

  return (
    <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden group">
      <img
        src={
          newBannerFile
            ? URL.createObjectURL(newBannerFile)
            : image
              ? image.url
              : Banner
        }
        onError={(e) => {
          e.target.src = Banner
        }}
        className="w-full h-full object-cover"
      />
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleClick}
            className="bg-white text-black px-4 py-2 rounded-md font-semibold"
          >
            Editar imagen
          </button>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={showImagePicker}
        className="hidden"
      />
    </div>
  )
}
