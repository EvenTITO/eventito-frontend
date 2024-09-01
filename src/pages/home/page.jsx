import { HTTPClient } from "@/services/api/HTTPClient";
import { apiGetMyEvents } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";
import { EVENTS_URL } from "@/lib/Constants";
import { useDispatch } from "react-redux";
import FetchStatus from "@/components/FetchStatus";

export default function HomePage() {
  const dispatch = useDispatch();
  const httpClient = new HTTPClient(EVENTS_URL, dispatch);

  const { isPending, error, data } = useQuery({
    queryKey: ["getMyEvents"],
    queryFn: () => apiGetMyEvents(httpClient),
  });

  const component = <div className="container h-full items-center">Ok</div>;
  return (
      <FetchStatus isPending={isPending} error={error} component={component} />
  );
}
