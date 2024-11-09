import * as LucideIcons from 'lucide-react'

export default function Icon({ name, s = "4", ...props }) {
  const LucidIcon = LucideIcons[name]
  return <LucidIcon className={`h-${s} w-${s}`} {...props} />
}
