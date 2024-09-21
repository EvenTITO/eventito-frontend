import { Outlet, useParams } from "react-router-dom";
import Header from "../_components/Header";
import Sidebar from "./_components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "@/services/api/events/general/hooks";
import { loadEvent } from "@/state/events/eventSlice";
import FetchStatus from "@/components/FetchStatus";

export default function LayoutEvents() {
  const { id: eventIdParams } = useParams();
  const { eventId, eventTitle, roles } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const layoutComponent = <Layout eventTitle={eventTitle} roles={roles} />;
  if (eventId && eventId === eventIdParams) {
    return layoutComponent;
  } else {
    const {
      isPending,
      error,
      data: eventInfo,
    } = getEvent("f2c9f5d2-3941-491e-93fc-8de65163c1d2");
    // } = getEvent(eventIdParams);

    if (eventInfo) {
      dispatch(
        loadEvent({
          roles: eventInfo.roles,
          eventTitle: eventInfo.title,
          eventId: eventInfo.id,
        }),
      );
    }

    return (
      <FetchStatus
        isPending={isPending}
        error={error}
        component={layoutComponent}
      />
    );
  }
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
