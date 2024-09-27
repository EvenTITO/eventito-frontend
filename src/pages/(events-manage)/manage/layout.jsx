import { Outlet } from "react-router-dom";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";
import { useEffect } from "react";
import { useNavigator } from "@/lib/navigation";
import { getEventId } from "@/lib/utils";

export default function LayoutOrganization() {
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
    if (
      !roles ||
      roles.length === 0 ||
      roles.filter((r) => r === "ORGANIZER").length === 0
    ) {
      console.log(roles);
      navigator.to(`/view/events/${eventId}`);
    }
  }, [roles]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={false} headerTitle={eventTitle} />

      <div className="flex flex-1 pt-16">
        <Sidebar isSidebarOpen={true} roles={roles} />
        <main className="flex-1 p-4 md:ml-64 pt-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
