import { useEvent } from '@/lib/layout'
import { useGetMyWorks } from '@/hooks/events/authorHooks'
import Page from './page'

export default function AuthorPage() {
  const eventData = useEvent()
  // TODO: add pending & error state
  const { data: works } = useGetMyWorks()

  return <Page works={works || []} eventData={eventData || {}} />
}
