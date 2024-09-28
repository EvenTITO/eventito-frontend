import { Outlet } from "react-router-dom";
import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";
import { useEffect } from "react";
import { useNavigator } from "@/lib/navigation";
import { getEventId } from "@/lib/utils";
import EventSidebar from "./_components/Sidebar";

export default function LayoutEvents() {
  const { data: eventData, isPending } = useGetEvent();

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

function Layout({ eventTitle, roles }) {
  const eventId = getEventId();
  const navigator = useNavigator();

  useEffect(() => {
    if (!roles || roles.length === 0) {
      navigator.to(`/view/events/${eventId}`);
    }
  }, [roles]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header headerTitle={eventTitle} />

      <div className="flex flex-1 pt-16">
        <EventSidebar roles={roles} />
        <main className="flex-1 p-4 md:ml-64 pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
