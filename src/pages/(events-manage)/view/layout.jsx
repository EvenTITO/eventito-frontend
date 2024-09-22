import { Outlet, useParams } from "react-router-dom";
import Header from "../_components/Header";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";

export default function LayoutViewEvent() {
  const { id: eventId } = useParams();
  const { data: eventData, isPending } = useGetEvent(eventId);

  const layoutComponent = (
    <Layout
      eventTitle={eventData?.title || ""}
      roles={eventData?.roles || []}
    />
  );
  return (
    <FetchStatus
      isPending={isPending}
      error={false}
      component={layoutComponent}
    />
  );
}

function Layout({ eventTitle }) {

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={false} headerTitle={eventTitle} />

      <div className="pt-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
