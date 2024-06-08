import {
  Tabs,
  TabsList,
  TabsTrigger2
} from "@/components/ui/tabs"
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function EventHeader({ event }) {
  return (
    <header className="bg-white">
      <AdjustableTabs tabItems={tabItems} />
    </header>
  );
}

function AdjustableTabs({ tabItems }) {
  const navigate = useNavigate();
  const { id: eventId } = useParams();
  const params = useLocation().pathname.split('/');
  const location = params.length > 3 ? params.at(-1) : "";


  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Tabs defaultValue={location} className="">
        <TabsList className="flex w-full bg-white">
          {tabItems.map((tab, index) => (
            <TabsTrigger2
              key={index}
              value={tab.value}
              className="flex-grow text-center p-2 bg-transparent text-slate-500"
              onClick={() => navigate(`/events/${eventId}/${tab.value}`)}
            >
              {tab.label}
            </TabsTrigger2>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

const tabItems = [
  { value: "", label: "General" },
  { value: "calendar", label: "Calendario" },
  { value: "presentations", label: "Mis trabajos" },
  { value: "configuration", label: "Configuración" },
];
