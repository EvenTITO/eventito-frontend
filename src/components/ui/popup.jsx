import * as React from 'react'
import * as PopupPrimitive from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'

const Popup = PopupPrimitive.Root

const PopupTrigger = PopupPrimitive.Trigger

const PopupPortal = PopupPrimitive.Portal

const PopupClose = PopupPrimitive.Close

const PopupOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <PopupPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/40 backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
PopupOverlay.displayName = PopupPrimitive.Overlay.displayName

const PopupContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const containerStyles =
      'fixed right-0 top-[50%] z-50 grid h-full min-w-[500px] max-w-full translate-x-0 translate-y-[-50%] gap-4 border bg-background shadow-lg p-4 h-full flex flex-col'

    const animation =
      'duration-1000 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-right-[100%] data-[state=open]:slide-in-from-right-[100%] data-[state=open]:slide-in-from-top-[50%] data-[state=closed]:slide-out-to-top-[50%]'

    return (
      <PopupPortal>
        <PopupOverlay />
        <PopupPrimitive.Content
          ref={ref}
          className={cn(containerStyles, animation, className)}
          {...props}
        >
          {children}
        </PopupPrimitive.Content>
      </PopupPortal>
    )
  }
)
PopupContent.displayName = PopupPrimitive.Content.displayName

const PopupHeader = ({ className, ...props }) => (
  <div
    className={cn('flex flex-col space-y-1.5 text-left p-4', className)}
    {...props}
  />
)
PopupHeader.displayName = 'PopupHeader'

const PopupFooter = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse flex-row justify-end space-x-2 items-end',
      'pt-4 bg-white border-t border-gray-200',
      className
    )}
    {...props}
  />
)
PopupFooter.displayName = 'PopupFooter'

const PopupTitle = React.forwardRef(({ className, ...props }, ref) => (
  <PopupPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
PopupTitle.displayName = PopupPrimitive.Title.displayName

const PopupDescription = React.forwardRef(({ className, ...props }, ref) => (
  <PopupPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
PopupDescription.displayName = PopupPrimitive.Description.displayName

export {
  Popup,
  PopupPortal,
  PopupOverlay,
  PopupClose,
  PopupTrigger,
  PopupContent,
  PopupHeader,
  PopupFooter,
  PopupTitle,
  PopupDescription,
}
