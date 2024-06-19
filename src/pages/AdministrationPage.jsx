import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import UsersList from "@/features/administration/components/UsersList.jsx";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {Button} from "@/components/ui/button.jsx";
import {ListFilter} from "lucide-react";
import {useEffect, useState} from "react";
import SearchBar from "@/components/SearchBar.jsx";
import {apiGetUsers, apiPatchUserRole} from "@/services/api/userServices.js";
import EventCreateRequestsList from "@/features/administration/components/EventCreateRequestsList.jsx";
import {apiGetEventsByStatus, apiPatchEventStatus} from "@/services/api/eventServices.js";


export const AdministrationPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(true);
    const [showAdminUsers, setShowAdminUsers] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [tab, setTab] = useState("usuarios");

    const onTabChange = (value) => {
        setTab(value);
    }

    const refreshData = async () => {
        const apiUsers = await apiGetUsers();
        const apiEvents = await apiGetEventsByStatus("WAITING_APPROVAL");
        setAllUsers(apiUsers);
        setFilteredUsers(apiUsers);
        setAllEvents(apiEvents);
        setFilteredEvents(apiEvents);
    };

    // Component did mount -> se ejecuta la primera vez cuando renderiza la pagina
    useEffect(() => {
        refreshData().then(r => console.log("Users and events loaded"));
    }, []);

    const handleShowAllUsers = () => {
        setFilteredUsers(allUsers);
        setShowAllUsers(true);
        setShowAdminUsers(false);
    }

    const handleShowAdminUsers = () => {
        setFilteredUsers(filteredUsers.filter(u => u.role === "ADMIN"));
        setShowAllUsers(false);
        setShowAdminUsers(true);
    }

    const handleEditUserRole = async (userId, newRole) => {
        await apiPatchUserRole(userId, newRole);
        refreshData().then(r => console.log("Users reloaded"));
    }

    const handleEditEventStatus = async (eventId, status) => {
        const res = await apiPatchEventStatus(eventId, status);
        console.log(res);
        refreshData().then(r => console.log("Events reloaded"));
    }

    const handleSearchText = (event) => {
        const text = event.target.value;
        setSearchText(text);
        const lowerText = text.toLowerCase();
        if(tab === "usuarios"){
            let showUsers = allUsers
                .filter(u => u.name.toLowerCase().includes(lowerText) ||
                    u.lastname.toLowerCase().includes(lowerText) ||
                    u.email.toLowerCase().includes(lowerText));
            if (showAdminUsers) {
                showUsers = showUsers.filter(u => u.role === "ADMIN")
            }
            setFilteredUsers(showUsers);
        }
        if(tab === "solicitudes"){
            let showEvents = allEvents
                .filter(e => e.title.toLowerCase().includes(lowerText) ||
                    e.description.toLowerCase().includes(lowerText));
            setFilteredEvents(showEvents);
        }
    }

    return (
        <>
            <HeaderDivisor/>
            <div className="w-full h-full px-10">
                <div className="w-full h-full py-6 px-10">
                    <main className="grid flex-1 items-start gap-4 p-4  md:gap-8">
                        <Tabs defaultValue="usuarios" onValueChange={onTabChange}>
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
                                    <TabsTrigger value="solicitudes">Solicitudes</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <SearchBar placeholder={`Buscar ${tab}...`} handleSearchText={handleSearchText}/>
                                    {tab === "usuarios" && (<DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                                <ListFilter className="h-3.5 w-3.5"/>
                                                <span
                                                    className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtrar</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                            <DropdownMenuSeparator/>
                                            <DropdownMenuCheckboxItem checked={showAllUsers}
                                                                      onCheckedChange={handleShowAllUsers}>
                                                Todos
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem checked={showAdminUsers}
                                                                      onCheckedChange={handleShowAdminUsers}>
                                                Admins
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>)}
                                </div>
                            </div>
                            <TabsContent value="usuarios">
                                <Card x-chunk="dashboard-06-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Usuarios</CardTitle>
                                        <CardDescription>
                                            Administra los usuarios de la plataforma.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <UsersList users={filteredUsers} editUser={handleEditUserRole}/>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="solicitudes">
                                <Card x-chunk="dashboard-06-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Solicitudes</CardTitle>
                                        <CardDescription>
                                            Administra las solicitudes de creación de eventos.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <EventCreateRequestsList events={filteredEvents}
                                                                 editEventStatus={handleEditEventStatus}/>
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
