import FetchStatus from '@/components/FetchStatus'
import { useGetInscriptions } from '@/hooks/manage/inscriptionHooks'
import Page from './page'

export default function InscriptionsDataPage() {
  const { data: inscriptions, isPending, error } = useGetInscriptions()

  if (inscriptions) {
    console.log('inscripciones', inscriptions)
  }

  const component = <Page inscriptions={inscriptions || []} />
  return (
    <FetchStatus component={component} isPending={isPending} error={error} />
  )
}
