import { useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import Logo from '@/assets/logo.svg'

export default function ImageLogo({
  image,
  isEditing,
  newLogoFile,
  setLogoFile,
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
      setLogoFile(e.target.files[0])
    }
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
      <button
        onClick={handleClick}
        disabled={!isEditing}
        className="rounded-lg overflow-hidden"
      >
        {isEditing ? (
          <Avatar
            className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200"
            style={{
              opacity: isHovered ? 0.7 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <AvatarImage
              src={
                newLogoFile
                  ? URL.createObjectURL(newLogoFile)
                  : image
                    ? image.url
                    : Logo
              }
            />
            <AvatarFallback>
              <img
                className="size-10 transition-all group-hover:scale-110"
                src={Logo}
              />
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200">
            <AvatarImage src={image ? image.url : Logo} />
            <AvatarFallback>
              <img
                className="size-10 transition-all group-hover:scale-110"
                src={Logo}
              />
            </AvatarFallback>
          </Avatar>
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
