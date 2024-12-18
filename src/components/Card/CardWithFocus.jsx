import { cn } from '@/lib/utils'
import Icon from '../Icon'
import { Image } from '@nextui-org/image'

export default function CardWithFocus({
  icon = null,
  nameIcon = null,
  imageIcon = null,
  onClick,
  children,
  containerClassNames = null,
  rightComponent = null,
}) {
  return (
    <div
      className={cn(
        'group flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 cursor-pointer w-full',
        containerClassNames
      )}
      onClick={onClick}
    >
      {icon}
      {nameIcon ? (
        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
          <Icon name={nameIcon} />
        </div>
      ) : null}
      {imageIcon ? (
        <div className="p-2 rounded-md bg-background text-primary group-hover:bg-accent group-hover:text-primary-foreground transition-colors duration-200">
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
      <div className="text-muted-foreground/50 group-hover:text-accent-foreground/50 transition-colors duration-200">
        {rightComponent}
        {!rightComponent && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 12L10 8L6 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  )
}
