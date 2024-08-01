import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Badge} from "@/components/ui/badge.jsx";
import {Loader2, UserRoundX} from "lucide-react";
import React, {useState} from "react";

export default function ChairsList({chairs, deleteChair}) {
    const [loading, setLoading] = useState(false);

    const handleDeleteChair = (chairId) => {
        setLoading(true);
        deleteChair(chairId);
        setLoading(false);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="sm:table-cell p-1"></TableHead>
                    <TableHead className="px-1">Usuario</TableHead>
                    <TableHead className="px-1">Email</TableHead>
                    <TableHead className="px-1">Estado</TableHead>
                    <TableHead className="px-1">Tracks</TableHead>
                    <TableHead className="px-1"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {chairs.map((c) => {
                    return (
                        <TableRow onClick={() => console.log(c.user_id)} key={c.user_id}>
                            <TableCell className="px-1">
                                <Avatar className="h-7 w-7 sm:flex">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar"/>
                                    <AvatarFallback>{c.user.name[0] + c.user.lastname[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium px-1">
                                {c.user.name + " " + c.user.lastname}
                            </TableCell>
                            <TableCell className="font-medium px-1">
                                {c.user.email}
                            </TableCell>
                            <TableCell className="font-medium px-1">
                                {c.invitation_status}
                            </TableCell>
                            <TableCell className="font-medium px-1 max-w-48">
                                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                    {
                                        c.tracks?.map(t => {
                                            return (<Badge key={t} className="m-1" variant="outline">
                                                {t}
                                            </Badge>)
                                        })
                                    }
                                </div>
                            </TableCell>
                            <TableCell className="px-1">
                                <Button disabled={loading} className="bg-red-600" size="icon"
                                        onClick={() => handleDeleteChair(c.user_id)}>
                                    {(loading) && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
                                    <UserRoundX/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}
