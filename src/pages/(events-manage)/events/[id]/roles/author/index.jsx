import Page from "./page";
import { useGetMyWorks } from "@/hooks/events/authorHooks";

export default function AuthorPage() {
  const { data: works, isPending, error } = useGetMyWorks();

  return <Page works={works || []} />;
}
