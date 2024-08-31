import { useQuery } from "@tanstack/react-query";
import { getMembers } from "./data";

export function useQueryMembers() {
  return useQuery({
    queryKey: ["membersEvent"],
    queryFn: () => getMembers(),
  });
}
