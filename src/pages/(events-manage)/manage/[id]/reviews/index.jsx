import Page from './page'
import { useEvent } from '@/lib/layout'

export default function ReviewsConfigPage() {
  const eventData = useEvent()

  return <Page reviewSkeleton={eventData?.review_skeleton || {}} />
}
