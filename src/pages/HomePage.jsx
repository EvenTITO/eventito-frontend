import { ListFilter, Loader2, PlusCircle, } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addHeader } from "@/services/state/events/eventSlice"
import HeaderDivisor from "@/components/ui/HeaderDivisor"
import EventsList from "@/features/events/components/EventsList"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {
    apiGetEventsByStatus, apiGetMyEvents,
    apiPostEvent
} from "@/services/api/eventServices.js";

export default function HomePage() {
    const [eventSelected, setEventSelected] = useState(null);
    const [tab, setTab] = useState("all");
    const [newEvent, setNewEvent] = useState(defaultEvent);
    const [newEventLoading, setNewEventLoading] = useState(false);
    const [createEventOpen, setCreateEventOpen] = useState(false);
    const [myEvents, setMyEvents] = useState([]);
    const [publicEvents, setPublicEvents] = useState([]);
    const dispatch = useDispatch();

    // Component did mount -> se ejecuta la primera vez cuando renderiza la pagina
    useEffect(() => {
        dispatch(addHeader([{ link: '/', name: 'Eventos' }]));
        refreshData().then(r => console.log("Events loaded"));
    }, []);

    const refreshData = async () => {
        const apiPublicEvents = await apiGetEventsByStatus("STARTED");
        const apiMyEvents = await apiGetMyEvents();
        setMyEvents(apiMyEvents);
        setPublicEvents(apiPublicEvents);
    };

    const onTabChange = (value) => {
        setTab(value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSelectType = (value) => {
        setNewEvent({ ...newEvent, event_type: value });
    };

    const handleCreateEvent = async () => {
        setNewEventLoading(true);
        await apiPostEvent(newEvent);
        refreshData().then(r => console.log("My events reloaded"));
        setCreateEventOpen(false);
        setTab("draft");
        setNewEventLoading(false);
        setNewEvent(defaultEvent);
    }

    if (eventSelected) {
        return <Navigate to={`/events/${eventSelected}`} />;
    } else {
        return (
            <>
                <HeaderDivisor />
                <div className="w-full h-full px-10">
                    <div className="w-full h-full py-6 px-10">
                        <main className="grid flex-1 items-start gap-4 p-4  md:gap-8">
                            <Tabs value={tab} onValueChange={onTabChange}>
                                <div className="flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="all">Todos</TabsTrigger>
                                        <TabsTrigger value="draft">Mis eventos</TabsTrigger>
                                    </TabsList>
                                    <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                                    <ListFilter className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                        Filtrar
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuCheckboxItem checked>
                                                    Todos
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem>
                                                    Participando
                                                </DropdownMenuCheckboxItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Dialog open={createEventOpen} onOpenChange={setCreateEventOpen}>
                                            <DialogTrigger asChild>
                                                <Button size="sm" className="h-8 gap-1">
                                                    <PlusCircle className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                        Nuevo evento
                                                    </span>
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                    <DialogTitle>Crear evento</DialogTitle>
                                                    <DialogDescription>
                                                        Complete la descripción general para realizar la solicitud de
                                                        creación.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid gap-2 mb-3">
                                                        <Label htmlFor="title">Título</Label>
                                                        <Input name="title"
                                                            id="title"
                                                            placeholder="Ingrese el título del evento..."
                                                            onChange={handleInputChange}
                                                            value={newEvent.title}
                                                            disabled={newEventLoading} />
                                                    </div>
                                                    <div className="grid gap-2 mb-3">
                                                        <Label htmlFor="description">Descripción</Label>
                                                        <Textarea name="description"
                                                            id="description"
                                                            placeholder="Ingrese un descripción para el evento..."
                                                            onChange={handleInputChange}
                                                            value={newEvent.description}
                                                            disabled={newEventLoading} />
                                                    </div>
                                                    <div className="grid gap-2 mb-3">
                                                        <Label htmlFor="description">Tipos de evento</Label>
                                                        <Select value={newEvent.event_type}
                                                            disabled={newEventLoading}
                                                            onValueChange={handleSelectType}>
                                                            <SelectTrigger className="w-[180px]">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>Tipos de evento</SelectLabel>
                                                                    <SelectItem
                                                                        value="CONFERENCE">Conferencia</SelectItem>
                                                                    <SelectItem value="TALK">Charla</SelectItem>
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    {newEventLoading ? (
                                                        <Button disabled>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                            Enviando...
                                                        </Button>) :
                                                        (
                                                            <Button type="button"
                                                                onClick={handleCreateEvent}>Enviar</Button>
                                                        )
                                                    }
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                                <TabsContent value="all">
                                    <Card x-chunk="dashboard-06-chunk-0">
                                        <CardHeader>
                                            <CardTitle>Eventos</CardTitle>
                                            <CardDescription>
                                                Elegí el evento del que querés saber más.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <EventsList events={publicEvents} setEventSelected={setEventSelected} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="draft">
                                    <Card x-chunk="dashboard-06-chunk-0">
                                        <CardHeader>
                                            <CardTitle>Eventos</CardTitle>
                                            <CardDescription>
                                                Elegí el evento del que querés saber más.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <EventsList events={myEvents} setEventSelected={setEventSelected} />
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </main>
                    </div>
                </div>
            </>
        );
    }
}

const defaultEvent = {
    title: "",
    description: "",
    event_type: "CONFERENCE",
}
