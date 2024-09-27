import Page from "./page";
import FetchStatus from "@/components/FetchStatus";
import {useGetEvent} from "@/hooks/events/useEventState.js";
import {useLocation} from "react-router-dom";

export default function NewPaymentPage() {
  const location = useLocation();
  const {data: eventData,isPending,error} = useGetEvent();
  const component = (<Page eventData={eventData || {}} inscriptionId={location.state.inscriptionId}/>);

  return (
    <FetchStatus
      component={component}
      isPending={isPending}
      error={error}
    />
  );
}
