import Page from "./page";
import FetchStatus from "@/components/FetchStatus";
import {useGetWorkById} from "@/hooks/events/worksHooks.js";

export default function ViewWorkPage() {
  const {data: workData, isPending, error} = useGetWorkById();

  const component = <Page workData={workData}/>;
  return (
    <FetchStatus component={component} isPending={isPending} error={error}/>
  );
}
