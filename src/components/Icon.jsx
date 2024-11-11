import { cn } from '@/lib/utils'
import * as LucideIcons from 'lucide-react'

export default function Icon({ name, s = '4', classNames, ...props }) {
  const LucidIcon = LucideIcons[name]
  return <LucidIcon className={cn(`h-${s} w-${s}`, classNames)} {...props} />
}
