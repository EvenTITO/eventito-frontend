import {Tabs, TabsList, TabsTrigger2} from "@/components/ui/tabs"
import {useLocation, useNavigate, useParams} from "react-router-dom";

export default function EventHeader({event}) {
    console.log("event: "+JSON.stringify(event));
    return (
        <header className="bg-white">
            <AdjustableTabs tabItems={tabItems} event={event}/>
        </header>
    );
}

function AdjustableTabs({tabItems, event}) {
    const navigate = useNavigate();
    const {id: eventId} = useParams();
    const paths = useLocation().pathname.split('/');
    const location = paths.at(-1) === eventId ? "" : paths.at(paths.indexOf(eventId) + 1);

    const handleTabNavigate = (tab) => {
        if (tab === "") {
            navigate(`/events/${eventId}`, {state: {event: event}})
        }
        navigate(`/events/${eventId}/${tab}`, {state: {event: event}});
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <Tabs defaultValue={location} className="">
                <TabsList className="flex w-full bg-white">
                    {tabItems.map((tab, index) => (
                        <TabsTrigger2
                            key={index}
                            value={tab.value}
                            className="flex-grow text-center p-2 bg-transparent text-slate-500"
                            onClick={() => handleTabNavigate(tab.value)}
                        >
                            {tab.label}
                        </TabsTrigger2>
                    ))}
                </TabsList>
            </Tabs>
        </div>
    );
}

const tabItems = [
    {value: "", label: "General"},
    {value: "calendar", label: "Calendario"},
    {value: "presentations", label: "Mis trabajos"},
    {value: "configuration", label: "Configuración"},
];
