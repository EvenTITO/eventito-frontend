import {Link, useLocation, useNavigate} from "react-router-dom";
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

export default function EventCreationCalendar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);
    const [workDeadlineDateOpen, setWorkDeadlineDateOpen] = useState(false);
    const [inscriptionDeadlineDateOpen, setInscriptionDeadlineDateOpen] = useState(false);
    const [calendar, setCalendar] = useState(location.state != null && location.state.calendar ? location.state.calendar : defaultCalendar);

    const nextCreationStep = () => {
        navigate("/events/creation/calendar", {state: {...location.state, calendar: calendar}});
    }

    const backCreationStep = () => {
        navigate("/events/creation/general", {state: {...location.state, calendar: calendar}});
    }

    const handleStartDate = (date) => {
        setCalendar({...calendar, startDate: date});
        setStartDateOpen(false);
    }

    const handleEndDate = (date) => {
        setCalendar({...calendar, endDate: date});
        setEndDateOpen(false);
    }

    const handleWorkDeadLineDate = (date) => {
        setCalendar({...calendar, workDeadLineDate: date});
        setWorkDeadlineDateOpen(false);
    }

    const handleInscriptionDeadLineDate = (date) => {
        setCalendar({...calendar, inscriptionDeadLineDate: date});
        setInscriptionDeadlineDateOpen(false);
    }

    const handleNonDecidedDatesCheckBox = (value) => {
        setCalendar({...defaultCalendar, nonDecidedDates: value});
    };

    return (
        <div className="flex min-h-screen w-full flex-col">
            <HeaderDivisor/>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Crear evento</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link to="/events/creation/general"
                              state={{...location.state, calendar: calendar}}>
                            General
                        </Link>
                        <Link to="/events/creation/calendar"
                              state={{...location.state, calendar: calendar}}
                              className="font-semibold text-primary">
                            Calendario
                        </Link>
                        <Link to="/events/creation/work"
                              state={{...location.state, calendar: calendar}}>
                            Trabajos</Link>
                        <Link to="/events/creation/pricing"
                              state={{...location.state, calendar: calendar}}>
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
                                                disabled={calendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !calendar.startDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {calendar.startDate ? format(calendar.startDate, "PPP", {locale: es}) :
                                                    <span>Escoje una fecha de inicio</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={calendar.startDate}
                                                onSelect={handleStartDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="endDate">Fecha de fin</Label>
                                    <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={calendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !calendar.endDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {calendar.endDate ? format(calendar.endDate, "PPP", {locale: es}) :
                                                    <span>Escoje una fecha de fin</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={calendar.endDate}
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
                                                disabled={calendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !calendar.workDeadLineDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {calendar.workDeadLineDate ? format(calendar.workDeadLineDate, "PPP", {locale: es}) :
                                                    <span>Escoje una fecha limite</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={calendar.workDeadLineDate}
                                                onSelect={handleWorkDeadLineDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="endDate">Fecha límite de inscripciones para presentar trabajo</Label>
                                    <Popover open={inscriptionDeadlineDateOpen} onOpenChange={setInscriptionDeadlineDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                disabled={calendar.nonDecidedDates}
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[280px] justify-start text-left font-normal",
                                                    !calendar.inscriptionDeadLineDate && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {calendar.inscriptionDeadLineDate ? format(calendar.inscriptionDeadLineDate, "PPP", {locale: es}) :
                                                    <span>Escoje una fecha limite</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={calendar.inscriptionDeadLineDate}
                                                onSelect={handleInscriptionDeadLineDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include" checked={calendar.nonDecidedDates}
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
