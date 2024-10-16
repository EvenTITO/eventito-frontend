import { useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function ImageLogo({
  eventTitle,
  image,
  isEditing = false,
  newLogoFile,
  setLogoFile,
}) {
  const showImagePicker = useRef(null)

  const handleClick = () => {
    showImagePicker.current?.click()
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0] && setLogoFile) {
      setLogoFile(e.target.files[0])
    }
  }

  const initials = getInitials(eventTitle)

  return (
    <div className="relative group">
      <Avatar className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200">
        <AvatarImage
          src={newLogoFile ? URL.createObjectURL(newLogoFile) : image?.url}
          alt={eventTitle}
        />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleClick}
            className="text-white text-xs font-semibold"
          >
            Edit
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
