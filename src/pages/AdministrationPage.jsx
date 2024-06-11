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


export const AdministrationPage = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showAllUsers, setShowAllUsers] = useState(true);
    const [showAdminUsers, setShowAdminUsers] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            const apiUsers = await apiGetUsers();
            setAllUsers(apiUsers);
            setFilteredUsers(apiUsers);
        };
        getUsers().then(r => r);
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
        console.log(userId +" "+newRole)
        await apiPatchUserRole(userId,newRole);
    }

    const handleSearchText = (event) => {
        const text = event.target.value;
        setSearchText(text);
        const lowerText = text.toLowerCase();
        let showUsers = allUsers
            .filter(u => u.name.toLowerCase().includes(lowerText) ||
                u.lastname.toLowerCase().includes(lowerText) ||
                u.email.toLowerCase().includes(lowerText));
        if (showAdminUsers) {
            showUsers = showUsers.filter(u => u.role === "ADMIN")
        }
        setFilteredUsers(showUsers);
    }

    return (
        <>
            <HeaderDivisor/>
            <div className="w-full h-full px-10">
                <div className="w-full h-full py-6 px-10">
                    <main className="grid flex-1 items-start gap-4 p-4  md:gap-8">
                        <Tabs defaultValue="all">
                            <div className="flex items-center">
                                <TabsList>
                                    <TabsTrigger value="all">Usuarios</TabsTrigger>
                                    <TabsTrigger value="requests">Solicitudes</TabsTrigger>
                                </TabsList>
                                <div className="ml-auto flex items-center gap-2">
                                    <SearchBar placeholder={"Buscar usuarios..."} handleSearchText={handleSearchText}/>
                                    <DropdownMenu>
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
                                    </DropdownMenu>
                                </div>
                            </div>
                            <TabsContent value="all">
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
                            <TabsContent value="requests">
                                <Card x-chunk="dashboard-06-chunk-0">
                                    <CardHeader>
                                        <CardTitle>Solicitudes</CardTitle>
                                        <CardDescription>
                                            Administra las solicitudes de creación de eventos.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
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

const users = [
    {
        "role": "ADMIN",
        "name": "Pepe",
        "lastname": "Argento",
        "email": "pepe.argento@email.com",
        "id": "12348"
    },
    {
        "role": "DEFAULT",
        "name": "Fernando",
        "lastname": "Sinisi",
        "email": "fsinisi@fi.uba.ar",
        "id": "123456789"
    }
];
