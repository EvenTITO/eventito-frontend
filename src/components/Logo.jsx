import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import EventitoLogo from '@/components/ui/EventitoLogo'

export default function Logo({ showName, bgColor = 'gray-100' }) {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Button variant="secondary" size="icon" className={`rounded-full`}>
          <EventitoLogo bgColor={bgColor} />
        </Button>
        {showName ? <span>eventito</span> : null}
      </Link>
    </nav>
  )
}
