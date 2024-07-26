import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UserRoundX, Loader2} from "lucide-react";
import {useState} from "react";

export default function OrganizersList({organizers}) {
    const [loading, setLoading] = useState(false);

    const handleDeleteOrganizer = (organizerId) => {
        setLoading(true);
        //TODO llamada a funcion pasada por parametro de la pantalla anterior
        console.log("eliminando organizador con id:" + organizerId);
        setLoading(false);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {organizers.map((o) => {
                    return (
                        <TableRow onClick={() => console.log(o.id)} key={o.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar"/>
                                    <AvatarFallback>{o.organizer.name[0] + o.organizer.lastname[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {o.organizer.name + " " + o.organizer.lastname}
                            </TableCell>
                            <TableCell className="font-medium">
                                {o.organizer.email}
                            </TableCell>
                            <TableCell className="font-medium">
                                ACTIVO
                            </TableCell>
                            <TableCell className="font-medium">
                                <Button disabled={loading} className="bg-red-600 ml-1" size="icon"
                                        onClick={() => handleDeleteOrganizer(o.id)}>
                                    {(loading) && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                                    <UserRoundX />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}
