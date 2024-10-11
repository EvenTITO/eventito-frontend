import { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Logo from '@/assets/logo.svg'

export default function ImageLogo({
  image,
  isEditing,
  newLogoFile,
  setLogoFile,
}) {
  const showImagePicker = useRef(null)

  const handleClick = () => {
    showImagePicker.current.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0])
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200">
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
            alt="Logo"
          />
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleClick}
            className="text-white text-xs font-semibold"
          >
            Editar
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
