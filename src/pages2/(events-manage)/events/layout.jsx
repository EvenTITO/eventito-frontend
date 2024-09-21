import { Outlet, useParams } from "react-router-dom";
import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";
import FetchStatus from "@/components/FetchStatus";
import { useEventState } from "@/hooks/events/useEventState";

export default function LayoutEvents() {
  const { id: eventIdParams } = useParams();
  const { eventData, isPending } = useEventState(
    "f2c9f5d2-3941-491e-93fc-8de65163c1d2",
  );

  const layoutComponent = (
    <Layout eventTitle={eventData.title} roles={eventData.roles} />
  );
  // TODO: verificar si el id del evento es el mismo en el que estoy parado.
  // Si no lo es => actualizarlo forzosamente.
  return (
    <FetchStatus
      isPending={isPending}
      error={error}
      component={layoutComponent}
    />
  );
}

function Layout({ eventTitle, roles }) {
  const roles2 = ["ORGANIZER", "CHAIR", "REVIEWER", "ATTENDEE", "AUTHOR"];
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={false} headerTitle={eventTitle} />

      {roles.length > 0 ? (
        <div className="flex flex-1 pt-16">
          <Sidebar isSidebarOpen={true} roles={roles2} />
          <main className="flex-1 p-4 md:ml-64 pt-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      ) : (
        <div className="pt-12">
          <main>
            <Outlet />
          </main>
        </div>
      )}
    </div>
  );
}
