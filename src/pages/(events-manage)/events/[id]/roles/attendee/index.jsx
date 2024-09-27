import {useGetMyInscription, useGetPayments} from "@/hooks/events/attendeeHooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function AttendeePage() {
  const inscription = useGetMyInscription();
  const payments = useGetPayments();

  const component = (
    <Page inscription={inscription.data} payments={payments.data}/>
  );

  return (
    <FetchStatus
      component={component}
      isPending={inscription.isPending || payments.isPending}
      error={inscription.error || payments.error}
    />
  );
}
