import { cn } from '@/lib/utils'
import Icon from '../Icon'
import { Image } from '@nextui-org/image'

export default function CardWithoutFocus({
  icon = null,
  nameIcon = null,
  imageIcon = null,
  children,
  containerClassNames = null,
}) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-4 rounded-lg border border-border w-full',
        containerClassNames
      )}
    >
      {icon}
      {nameIcon ? (
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          <Icon name={nameIcon} />
        </div>
      ) : null}
      {imageIcon ? (
        <div className="p-2 rounded-md bg-background text-primary">
          <Image
            isZoomed
            shadow="sm"
            radius={null}
            width="100%"
            alt={'Evento'}
            className="w-[150px] object-cover h-[50px]"
            src={imageIcon}
          />
        </div>
      ) : null}
      {children}
    </div>
  )
}
