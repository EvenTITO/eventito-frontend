import { apiGetEventById } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { isPending, error, data } = useQuery({
    queryKey: ["getEventById"],
    queryFn: () => apiGetEventById("f2c9f5d2-3941-491e-93fc-8de65163c1d2"),
  });

  if (isPending) {
    return <div>Loading....</div>;
  }

  console.log(data);
  return <div>ok!</div>;
}
