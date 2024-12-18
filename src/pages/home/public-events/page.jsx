import { SkeletonList } from '@/components/Skeleton'
import ContainerPage from '@/pages/(events-manage)/_components/containerPage'
import TitlePage from '@/pages/(events-manage)/_components/titlePage'
import EventsList from '../_components/EventsList'

export default function Page({ events, isPending }) {
  return (
    <ContainerPage>
      <TitlePage title="Próximos eventos" />
      {isPending ? <SkeletonList /> : <EventsList events={events || []} />}
    </ContainerPage>
  )
}
