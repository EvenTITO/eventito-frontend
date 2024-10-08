import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import Logo from '@/assets/logo.svg'

export default function ImageLogo({ image }) {
  return (
    <Avatar className="h-16 w-16 group-hover:ring-offset-4 transition-all duration-200">
      <AvatarImage src={image ? image.url : Logo} />
      <AvatarFallback>
        <img
          className="size-10 transition-all group-hover:scale-110"
          src={Logo}
        />
      </AvatarFallback>
    </Avatar>
  )
}
