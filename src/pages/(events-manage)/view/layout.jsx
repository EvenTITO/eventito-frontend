import { Outlet, useParams } from "react-router-dom";
import Header from "../_components/Header";
import FetchStatus from "@/components/FetchStatus";
import { useGetEvent } from "@/hooks/events/useEventState";
import HeaderWithTabs from "../_components/HeaderWithTabs";

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
  const { id } = useParams();
  const tabs = [
    { type: "normal", label: "General", to: `${id}/` },
    { type: "normal", label: "Inscripción", to: `${id}/register` },
    { type: "normal", label: "Calendario", to: `${id}/calendar` },
    { type: "normal", label: "Presentaciones", to: `${id}/pressentations` },
    { type: "normal", label: "Contacto", to: `${id}/contact` },
  ];

  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderWithTabs toggleSidebar={false} tabs={tabs} />

      <div className="pt-12">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
