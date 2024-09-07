import { cn } from "@/lib/utils"

export default function Loader({message = "Cargando datos del servidor...", showMessage = false}) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen bg-background">
      <div className="relative">
        <div
          className={cn(
            "w-12 h-12 rounded-full",
            "border-4 border-primary/30",
            "animate-[spin_1s_linear_infinite]"
          )}
        />
        <div
          className={cn(
            "absolute top-0 left-0 w-12 h-12",
            "border-4 border-transparent border-t-primary",
            "rounded-full animate-[spin_0.75s_cubic-bezier(0.55,_0.25,_0.25,_0.70)_infinite]"
          )}
        />
        <div
          className={cn(
            "absolute inset-0",
            "flex items-center justify-center",
            "text-primary font-semibold",
            "animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_infinite]"
          )}
        >
          <span className="sr-only">Loading</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v4" />
            <path d="M12 18v4" />
            <path d="M4.93 4.93l2.83 2.83" />
            <path d="M16.24 16.24l2.83 2.83" />
            <path d="M2 12h4" />
            <path d="M18 12h4" />
            <path d="M4.93 19.07l2.83-2.83" />
            <path d="M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
      </div>
      {showMessage ? message : null}
    </div>
  )
}
