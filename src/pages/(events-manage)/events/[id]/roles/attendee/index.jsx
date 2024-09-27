import {useGetMyInscription} from "@/hooks/events/attendeeHooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function AttendeePage() {
  const {data: inscription, isPending, error} = useGetMyInscription();

  const component = (<Page inscription={inscription}/>);

  return (
    <FetchStatus
      component={component}
      isPending={isPending}
      error={error}
    />
  );
}
