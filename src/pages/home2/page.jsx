import ContainerPage from '../(events-manage)/_components/containerPage'
import { Tabs, Tab } from '@nextui-org/tabs'
import MyEventsList from './_components/MyEventsList'

export default function Page({ events }) {
  return (
    <ContainerPage>
      <Tabs variant="underlined" color="primary" aria-label="Tabs home">
        <Tab key="Mis eventos" title="Mis eventos">
          <MyEventsList events={events} />
        </Tab>
        <Tab key="Todos los eventos" title="Todos los eventos">
          Chau
        </Tab>
      </Tabs>
    </ContainerPage>
  )
}
