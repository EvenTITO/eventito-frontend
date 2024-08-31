import { apiGetMyEvents } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getMyEvents"],
    queryFn: () => apiGetMyEvents(),
  });

  if (isPending) {
    return <div>Loading....</div>;
  } else if (error) {
    console.log("error" + error);
    return <div>error!</div>;
  }

  console.log(data);
  return <div className="container h-full items-center">Cantidad de eventos que tengo: {data.length}</div>;
}
