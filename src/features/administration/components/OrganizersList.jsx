import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {UserRoundX, Loader2} from "lucide-react";
import {useState} from "react";

export default function OrganizersList({organizers, deleteOrganizer}) {
    const [loading, setLoading] = useState(false);

    const handleDeleteOrganizer = (organizerId) => {
        setLoading(true);
        deleteOrganizer(organizerId);
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
                        <TableRow onClick={() => console.log(o.user_id)} key={o.user_id}>
                            <TableCell className="hidden sm:table-cell">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar"/>
                                    <AvatarFallback>{o.user.name[0] + o.user.lastname[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {o.user.name + " " + o.user.lastname}
                            </TableCell>
                            <TableCell className="font-medium">
                                {o.user.email}
                            </TableCell>
                            <TableCell className="font-medium">
                                {o.invitation_status}
                            </TableCell>
                            <TableCell className="font-medium">
                                <Button disabled={loading} className="bg-red-600 ml-1" size="icon"
                                        onClick={() => handleDeleteOrganizer(o.user_id)}>
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
