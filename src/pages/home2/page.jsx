import { Button } from '@nextui-org/button'
import ContainerPage from '../(events-manage)/_components/containerPage'
import TitlePage from '../(events-manage)/_components/titlePage'
import PublicEventsList from './_components/PublicEventsList'
import { SkeletonList } from './_components/Skeleton'
import Icon from '@/components/Icon'

export default function Page({ events, myEvents }) {
  return (
    <ContainerPage>
      <div className="space-y-20">
        <div className="space-y-6">
          <TitlePage
            title="Mis eventos"
            rightComponent={
              <Button variant="light" endContent={<Icon name={'ArrowRight'} />}>
                Ver todos
              </Button>
            }
          />
          <Render events={myEvents.data} isPending={myEvents.isPending} />
        </div>
        <div className="space-y-6">
          <TitlePage
            title="Próximos eventos"
            rightComponent={
              <Button variant="light" endContent={<Icon name={'ArrowRight'} />}>
                Ver todos
              </Button>
            }
          />
          <Render events={events.data} isPending={events.isPending} />
        </div>
      </div>
    </ContainerPage>
  )
}

function Render({ events, isPending }) {
  if (isPending) {
    return <SkeletonList />
  } else {
    return <PublicEventsList events={events} />
  }
}
