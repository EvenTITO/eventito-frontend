import Icon from '../Icon'

export default function CardWithFocus({ nameIcon = null, onClick, children }) {
  return (
    <div
      className="group flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent hover:border-accent-foreground/20 transition-all duration-200 cursor-pointer w-full"
      onClick={onClick}
    >
      {nameIcon ? (
        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
          <Icon name={nameIcon} />
        </div>
      ) : null}
      {children}
      <div className="text-muted-foreground/50 group-hover:text-accent-foreground/50 transition-colors duration-200">
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
      </div>
    </div>
  )
}
