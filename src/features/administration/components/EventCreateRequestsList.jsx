import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
<<<<<<< Updated upstream
import {CircleX, CircleCheck} from "lucide-react"
=======
import {CircleCheck, Loader2, CircleX} from "lucide-react"
import {useState} from "react";
>>>>>>> Stashed changes

export default function EventCreateRequestsList({events, editEventStatus}) {

    const handleAcceptEvent = (eventId) => {
        editEventStatus(eventId, "CREATED");
    }

    const handleRejectEvent = (eventId) => {
        editEventStatus(eventId, "NOT_APPROVED");
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Aprobación</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.map((event) => {
                    return (
                        <TableRow onClick={() => console.log(event.id)} key={event.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar"/>
                                    <AvatarFallback>{event.title[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {event.title}
                            </TableCell>
                            <TableCell className="font-medium">
                                {event.description}
                            </TableCell>
                            <TableCell className="font-medium">
                                {event.event_type}
                            </TableCell>
                            <TableCell className="font-medium">
                                {event.status}
                            </TableCell>
                            <TableCell className="">
                                    <Button className="bg-green-600 mr-1" size="icon" onClick={() => () => handleAcceptEvent(event.id)}>
                                        <CircleCheck/>
                                    </Button>
                                    <Button className="bg-red-600 ml-1" size="icon" onClick={() => () => handleRejectEvent(event.id)}>
                                        <CircleX/>
                                    </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}
