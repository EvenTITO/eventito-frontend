import { useRef, useState } from 'react'
import Banner from '@/assets/banner_default.png'

export default function ImageHeader({
  image,
  isEditing,
  newBannerFile,
  setBannerFile,
}) {
  const [isHovered, setIsHovered] = useState(false)
  const showImagePicker = useRef(false)

  const handleMouseOver = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleClick = () => {
    showImagePicker.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBannerFile(e.target.files[0])
    }
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <button
        onClick={handleClick}
        disabled={!isEditing}
        className="w-full h-[300px] mb-8 rounded-lg overflow-hidden"
      >
        {isEditing ? (
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
            style={{
              opacity: isHovered ? 0.7 : 1,
              transition: 'opacity 0.3s',
            }}
          />
        ) : (
          <img
            src={image ? image.url : Banner}
            onError={(e) => {
              e.target.src = Banner
            }}
            className="w-full h-full object-cover"
          />
        )}
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={showImagePicker}
        style={{ display: 'none' }}
      />
    </div>
  )
}
