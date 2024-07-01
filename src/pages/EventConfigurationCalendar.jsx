import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn} from "@/lib/utils.js";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar"
import {format} from "date-fns"
import {es} from "date-fns/locale"
import {Checkbox} from "@/components/ui/checkbox.jsx";
import EventHeader from "@/features/events/components/EventHeader.jsx";

export default function EventConfigurationCalendar() {
    const navigate = useNavigate();
    const location = useLocation();
    const {id} = useParams();
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [workDeadlineDateOpen, setWorkDeadlineDateOpen] = useState(false);
    const [inscriptionDeadlineDateOpen, setInscriptionDeadlineDateOpen] = useState(false);
    const [editedCalendar, setEditedCalendar] = useState(
        (location.state && location.state.editedCalendar) ? location.state.editedCalendar :
            (location.state && location.state.calendar) ? location.state.calendar : defaultCalendar
    );

    const nextCreationStep = () => {
        navigate(`/events/${id}/configuration/work`, {state: {...location.state, editedCalendar: editedCalendar}});
    }

    const backCreationStep = () => {
        navigate(`/events/${id}/configuration`, {state: {...location.state, editedCalendar: editedCalendar}});
    }

    const handleStartDate = (date) => {
        setEditedCalendar({...editedCalendar, startDate: date});
        setStartDateOpen(false);
    }

    const handleEndDate = (date) => {
        setEditedCalendar({...editedCalendar, endDate: date});
        setEndDateOpen(false);
    }

    const handleWorkDeadLineDate = (date) => {
        setEditedCalendar({...editedCalendar, workDeadLineDate: date});
        setWorkDeadlineDateOpen(false);
    }

    const handleInscriptionDeadLineDate = (date) => {
        setEditedCalendar({...editedCalendar, inscriptionDeadLineDate: date});
        setInscriptionDeadlineDateOpen(false);
    }

    const handleNonDecidedDatesCheckBox = (value) => {
        setEditedCalendar({...defaultCalendar, nonDecidedDates: value});
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <HeaderDivisor/>
            <EventHeader event={location.state.event}/>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Editar evento</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link to={`/events/${id}/configuration`}
                              state={{...location.state, editedCalendar: editedCalendar}}>
                            General
                        </Link>
                        <Link to={`/events/${id}/configuration/calendar`}
                              state={{...location.state, editedCalendar: editedCalendar}}
                              className="font-semibold text-primary">
                            Calendario
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{...location.state, editedCalendar: editedCalendar}}>
                            Trabajos</Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{...location.state, editedCalendar: editedCalendar}}>
                            Tarifas</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Calendario</CardTitle>
                                <CardDescription>
                                    Fecha importantes del evento.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="startDate">Fecha de inicio</Label>
                                    <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={editedCalendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !editedCalendar.startDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {editedCalendar.startDate ? format(editedCalendar.startDate, "PPP", {locale: es}) :
                                                    <span>Escoge una fecha de inicio</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={editedCalendar.startDate}
                                                onSelect={handleStartDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="endDate">Fecha de finalización</Label>
                                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={editedCalendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !editedCalendar.endDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {editedCalendar.endDate ? format(editedCalendar.endDate, "PPP", {locale: es}) :
                                                    <span>Escoge una fecha de finalización</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={editedCalendar.endDate}
                                                onSelect={handleEndDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="endDate">Fecha límite de envío de trabajos</Label>
                                    <Popover open={workDeadlineDateOpen} onOpenChange={setWorkDeadlineDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={editedCalendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !editedCalendar.workDeadLineDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {editedCalendar.workDeadLineDate ? format(editedCalendar.workDeadLineDate, "PPP", {locale: es}) :
                                                    <span>Escoge una fecha limite</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={editedCalendar.workDeadLineDate}
                                                onSelect={handleWorkDeadLineDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="endDate">Fecha límite de inscripciones para presentar
                                        trabajo</Label>
                                    <Popover open={inscriptionDeadlineDateOpen}
                                             onOpenChange={setInscriptionDeadlineDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={editedCalendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !editedCalendar.inscriptionDeadLineDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {editedCalendar.inscriptionDeadLineDate ? format(editedCalendar.inscriptionDeadLineDate, "PPP", {locale: es}) :
                                                    <span>Escoge una fecha limite</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={editedCalendar.inscriptionDeadLineDate}
                                                onSelect={handleInscriptionDeadLineDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include" checked={editedCalendar.nonDecidedDates}
                                              onCheckedChange={handleNonDecidedDatesCheckBox}/>
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Todavia no decido las fechas del evento.
                                    </label>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={backCreationStep} className="mx-1.5">Atras</Button>
                                <Button onClick={nextCreationStep} className="mx-1.5">Siguiente</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

const defaultCalendar = {
    startDate: "",
    endDate: "",
    workDeadLineDate: "",
    inscriptionDeadLineDate: "",
    nonDecidedDates: false
}
