import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import EventHeader from "@/features/events/components/EventHeader.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import SearchBar from "@/components/SearchBar.jsx";
import {
    apiGetEventById,
    apiGetEventConfigurationById,
    apiGetEventMembersByRole,
} from "@/services/api/eventServices.js";
import OrganizersList from "@/features/administration/components/OrganizersList.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Loader2} from "lucide-react";
import {Label} from "@/components/ui/label.jsx";
import {toast} from "@/components/ui/use-toast.js";
import {Input} from "@/components/ui/input.jsx";
import {MultipleSelector} from "@/components/ui/multiple-selector.jsx";
import {defaultEventConfig} from "@/lib/utils.js";

export default function EventConfigurationMembers() {
    const {id} = useParams();
    const location = useLocation();
    const [event, setEvent] = useState(defaultEventConfig);
    const [eventConfiguration, setEventConfiguration] = useState({});
    const [editedMembersConfiguration, setEditedMembersConfiguration] = useState({});

    const [tab, setTab] = useState("organizadores");
    const [searchText, setSearchText] = useState("");
    const [filteredOrganizers, setFilteredOrganizers] = useState([]);
    const [filteredChairs, setFilteredChairs] = useState([]);

    const refreshData = async () => {
        const event = !location.state?.event ? await apiGetEventById(id) : location.state.event;
        const eventConfiguration = !location.state?.eventConfiguration ?
            await apiGetEventConfigurationById(id) :
            location.state.eventConfiguration;
        setEvent(event)
        setEventConfiguration(eventConfiguration);
        //TODO
        const organizers = await apiGetEventMembersByRole(id, "organizers");
        const chairs = await apiGetEventMembersByRole(id, "reviewers"); //TODO cambiar por chairs cuando este el back
        setFilteredOrganizers(organizers);
        setFilteredChairs(chairs);
        setEditedMembersConfiguration({organizers: organizers, chairs: chairs})
    };

    useEffect(() => {
        refreshData().then(r => {
            console.log("Organizers and chairs loaded");
        });
    }, []);

    const onTabChange = (value) => {
        setTab(value);
    }

    const handleSearchText = (event) => {
        const text = event.target.value;
        setSearchText(text);
        const lowerText = text.toLowerCase();
        if (tab === "organizadores") {
            //todo no tiene sentido que si devuelve organizador tenga otro nodo dentro llamado organizers -> back cambiar
            let showOrganizers = editedMembersConfiguration.organizers
                .filter(o => o.organizer.name.toLowerCase().includes(lowerText) ||
                    o.organizer.lastname.toLowerCase().includes(lowerText) ||
                    o.organizer.email.toLowerCase().includes(lowerText));
            setFilteredOrganizers(showOrganizers);
        }
        if (tab === "chairs") {
            //TODO desde el back el reviewer actual no tiene nodo con datos
            /*let showChairs = allChairs
                .filter(c => c.title.toLowerCase().includes(lowerText) ||
                    c.description.toLowerCase().includes(lowerText));*/
            //setFilteredChairs(showChairs);
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <HeaderDivisor/>
            <EventHeader event={event}/>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Editar evento</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                        <Link to={`/events/${id}/configuration`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedMembersConfiguration
                              }}
                        >General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedMembersConfiguration
                              }}
                        >Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedMembersConfiguration
                              }}
                        >Trabajos
                        </Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedMembersConfiguration
                              }}
                        >Tarifas
                        </Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedMembersConfiguration
                              }}
                              className="font-semibold text-primary">
                            Miembros
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Miembros</CardTitle>
                                <CardDescription>
                                    Usuarios que pueden tomar accion sobre el evento.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <main className="grid flex-1 items-start gap-4 p-4  md:gap-8">
                                    <Tabs defaultValue="organizadores" onValueChange={onTabChange}>
                                        <div className="flex items-center">
                                            <TabsList>
                                                <TabsTrigger value="organizadores">Organizadores</TabsTrigger>
                                                <TabsTrigger value="chairs">Chairs</TabsTrigger>
                                            </TabsList>
                                            <div className="ml-auto flex items-center gap-2">
                                                <SearchBar placeholder={`Buscar ${tab}...`}
                                                           handleSearchText={handleSearchText}/>
                                            </div>
                                        </div>
                                        <TabsContent value="organizadores">
                                            <Card x-chunk="dashboard-06-chunk-0">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between">
                                                        Organizadores
                                                        {newMemberDialog("organizador", refreshData)}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Usuarios que administran y configuran el evento.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <OrganizersList organizers={filteredOrganizers}/>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                        <TabsContent value="chairs">
                                            <Card x-chunk="dashboard-06-chunk-0">
                                                <CardHeader>
                                                    <CardTitle className="flex items-center justify-between">
                                                        Chairs
                                                        {newMemberDialog("Chair", refreshData)}
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Revisores principales del evento para los distintos tracks.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                </CardContent>
                                            </Card>
                                        </TabsContent>
                                    </Tabs>
                                </main>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

const newMemberDialog = (role, refreshData) => {
    const [newMember, setNewMember] = useState({...defaultMember, role: role});
    const [addMemberOpen, setAddMemberOpen] = useState(false);
    const [addMemberLoading, setAddMemberLoading] = useState(false);

    const handleAddMember = async () => {
        if (validateEmail(newMember.email)) {
            setAddMemberLoading(true);
            //await apiPostNewMember(newEvent); //TODO usar role para POST al back
            console.log("guardando miembro al back")
            refreshData().then(r => console.log("Organizers and reviewers reloaded"));
            setAddMemberOpen(false);
            setAddMemberLoading(false);
            setNewMember(defaultMember);
        }
    }

    const validateEmail = (value) => {
        const validationMailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = validationMailRegex.test(value);
        if (!result) {
            toast({
                title: `Email inválido. Asegúrese de que tenga el siguiente formato: ejemplo@email.com`,
            });
            setNewMember({...newMember, error: "hola"})
        }
        return result;
    }

    const handleInputChange = (e) => {
        setNewMember({...newMember, email: e.target.value});
    };

    return (
        <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        className="bg-eventitoBlue text-white"
                        size="sm">
                    Agregar {role}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agregar {role}</DialogTitle>
                    <DialogDescription>
                        Complete con el mail del usuario al cual realizar la invitación.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="ejemplo@email.com"
                        value={newMember.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {(role === "Chair") && <div className="grid gap-2 mb-2">
                    <Label htmlFor="notifications">Tracks</Label>
                    <MultipleSelector
                        id="tracks"
                        name="tracks"
                        value={newMember.tracks}
                        //onChange={handleMultiSelectMail}
                        //onValidateCreatable={handleValidateMultiSelectMail}
                        defaultOptions={TRACKS_OPTIONS}
                        creatable={false}
                        disabled={false}
                        hideClearAllButton={true}
                        hidePlaceholderWhenSelected={false}
                        maxSelected={5}
                        onMaxSelected={(maxLimit) => {
                            toast({
                                title: `Has alcanzado la cantidad máxima de tracks de para el chair: ${maxLimit}`,
                            });
                        }}
                        placeholder="Agregue los tracks asignados a este nuevo miembro..."
                    ></MultipleSelector>
                </div>
                }
                <DialogFooter>
                    {addMemberLoading ? (
                            <Button disabled>
                                <Loader2
                                    className="mr-2 h-4 w-4 animate-spin"/>
                                Enviando...
                            </Button>) :
                        (
                            <Button type="button"
                                    onClick={handleAddMember}>Enviar</Button>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const defaultMember = {
    email: "",
    tracks: []
}

//TODO de donde saco los tracks del evento
const TRACKS_OPTIONS = [
    {label: 'track1', value: 'track1'},
    {label: 'track2', value: 'track2'},
    {label: 'track3', value: 'track3'}
];

