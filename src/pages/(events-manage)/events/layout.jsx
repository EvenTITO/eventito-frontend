import { Outlet, useParams } from "react-router-dom";
import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";

export default function LayoutEvents() {
  const { id: eventId } = useParams();
  const { data: eventData, isPending } = useGetEvent(eventId);

  if (eventData) {
    console.log(eventData);
  }
  // TODO: verificar si el id del evento es el mismo en el que estoy parado.
  // Si no lo es => actualizarlo forzosamente.
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
  const roles2 = ["ORGANIZER", "CHAIR", "REVIEWER", "ATTENDEE", "AUTHOR"];

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
