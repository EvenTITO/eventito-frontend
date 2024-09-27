import {useGetMyInscription} from "@/hooks/events/attendeeHooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function AttendeePage() {
  const inscription = useGetMyInscription();
  console.log(inscription.data)
  const component = (
    <Page inscription={inscription.data} payments={inscription.data.payments}/>
  );

  return (
    <FetchStatus
      component={component}
      isPending={inscription.isPending}
      error={inscription.error}
    />
  );
}
