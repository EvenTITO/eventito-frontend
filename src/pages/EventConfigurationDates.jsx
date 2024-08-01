import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn, defaultEventConfig} from "@/lib/utils.js";
import {CalendarIcon, Clock, Info, Loader2, MinusCircle, PlusCircle} from "lucide-react";
import {Calendar} from "@/components/ui/calendar"
import {format} from "date-fns"
import {es} from "date-fns/locale"
import EventHeader from "@/features/events/components/EventHeader.jsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {apiGetEventById, apiGetEventConfigurationById, apiPutEventConfiguration} from "@/services/api/eventServices.js";
import {TimePicker} from "@/components/ui/time-picker.jsx";
import {toDate, toFormatedDate, toFormatedTime, toTime} from "@/lib/dateUtils.js";

export default function EventConfigurationDates() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
    const [event, setEvent] = useState(defaultEventConfig);
    const [eventConfiguration, setEventConfiguration] = useState({dates: []});
    const [editedDatesConfiguration, setEditedDatesConfiguration] = useState({dates: []});
    const [addCustomDateOpen, setAddCustomDateOpen] = useState(false);
    const [newCustomDate, setNewCustomDate] = useState(defaultNewCustomDate);

    useEffect(() => {
        refreshData().then(r => console.log("Event configuration dates loaded."));
    }, [id]);

    const refreshData = async () => {
        const event = !location.state?.event ? await apiGetEventById(id) : location.state.event;
        const eventConfiguration = !location.state?.eventConfiguration ?
            await apiGetEventConfigurationById(id) :
            location.state.eventConfiguration;
        setEvent(event)
        setEventConfiguration(eventConfiguration);
        setEditedDatesConfiguration(initConfig(eventConfiguration.dates));
    };

    const saveChanges = async () => {
        setSaveChangesLoading(true);
        const newDateConfig = saveConfig(editedDatesConfiguration);
        apiPutEventConfiguration(id, "dates", newDateConfig)
            .then(r => {
                const newEvent = {...event, dates: newDateConfig.dates};
                const newEventConfiguration = {...eventConfiguration, dates: newDateConfig.dates};
                toast({
                    title: `Cambios guardados correctamente.`,
                });
                navigate(`/events/${id}/configuration/dates`, {
                    state: {
                        event: newEvent,
                        eventConfiguration: newEventConfiguration
                    }
                });
                console.log("dates configuration saved.");
            })
        setSaveChangesLoading(false);
        setSaveChangesDisabled(true);
    }

    const handleInputNameNewCustomDateChange = (e) => {
        const {value} = e.target;
        setNewCustomDate({...newCustomDate, name: value, label: value});
    };

    const handleInputDescriptionNewCustomDateChange = (e) => {
        setNewCustomDate({...newCustomDate, description: e.target.value});
    };

    const handleAddCustomDate = () => {
        setEditedDatesConfiguration({dates: [...editedDatesConfiguration.dates, newCustomDate]});
        setAddCustomDateOpen(false);
        setSaveChangesDisabled(false);
        setNewCustomDate(defaultNewCustomDate);
    }

    const handleDeleteCustomDate = (index) => {
        const nextCustomDates = editedDatesConfiguration.dates.filter((date, i) => i !== index || date.is_mandatory);
        setEditedDatesConfiguration({dates: nextCustomDates});
        setSaveChangesDisabled(false);
        setNewCustomDate(defaultNewCustomDate);
    }

    const handleDateValue = (index, dateValue) => {
        const nextDates = editedDatesConfiguration.dates.map((date, i) => {
            if (i === index) {
                return {...date, date: dateValue, date_open: false};
            }
            return date;
        })
        setEditedDatesConfiguration({dates: nextDates});
        setSaveChangesDisabled(false);
    }

    const setCustomDateOpen = (index, value) => {
        const nextDates = editedDatesConfiguration.dates.map((date, i) => {
            if (i === index) {
                return {...date, date_open: value};
            }
            return date;
        })
        setEditedDatesConfiguration({dates: nextDates});
    }

    const handleChangeTime = (index, value) => {
        const nextDates = editedDatesConfiguration.dates.map((date, i) => {
            if (i === index) {
                return {...date, time: value};
            }
            return date;
        })
        setEditedDatesConfiguration({dates: nextDates});
        setSaveChangesDisabled(false);
    }

    const handleAddTime = (index) => {
        const nextDates = editedDatesConfiguration.dates.map((date, i) => {
            if (i === index) {
                return {...date, show_time: true};
            }
            return date;
        })
        setEditedDatesConfiguration({dates: nextDates});
        setSaveChangesDisabled(false);
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <HeaderDivisor/>
            <EventHeader event={event}/>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-7xl gap-2">
                    <h1 className="text-3xl font-semibold">Editar evento</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground">
                        <Link to={`/events/${id}/configuration`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedDatesConfiguration
                              }}
                        >General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedDatesConfiguration
                              }}
                              className="font-semibold text-primary"
                        >Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedDatesConfiguration
                              }}
                        >Trabajos
                        </Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedDatesConfiguration
                              }}
                        >Tarifas
                        </Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedDatesConfiguration
                              }}
                        >Miembros
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Fechas</CardTitle>
                                <CardDescription>
                                    Fechas importantes del evento.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    {editedDatesConfiguration && editedDatesConfiguration.dates &&
                                        editedDatesConfiguration.dates.map((date, i) => {
                                            return (
                                                <div className="grid gap-2 mb-3" key={i}>
                                                    <div className="flex items-center space-x-2">
                                                        <Label>{date.label}</Label>
                                                        <TooltipProvider>
                                                            {date.description && (
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="flex space-x-0.5">
                                                                            <Info className="h-3.5 w-3.5"/>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="max-w-96">
                                                                        <p className="text-sm text-muted-foreground">{date.description}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            )}
                                                        </TooltipProvider>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Popover open={date.date_open}
                                                                 onOpenChange={(value) => setCustomDateOpen(i, value)}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[280px] justify-start text-left font-normal",
                                                                        !date.date && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                                    {date.date ? format(date.date, "PPP", {locale: es}) :
                                                                        <span>Escoge una fecha</span>
                                                                    }
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={date.date}
                                                                    onSelect={(value) => handleDateValue(i, value)}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        {date.show_time && (
                                                            <TimePicker date={date.time}
                                                                        granularity="minute"
                                                                        onChange={(value) => handleChangeTime(i, value)}
                                                            />
                                                        )}
                                                        {!date.show_time && (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <span className="gap-1 ml-3"
                                                                              onClick={() => handleAddTime(i)}>
                                                                            <Clock className="h-3.5 w-3.5"/>
                                                                        </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Agregar horario</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )}
                                                        {!date.is_mandatory && (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <span className="gap-1 ml-3"
                                                                              onClick={() => handleDeleteCustomDate(i)}>
                                                                            <MinusCircle className="h-3.5 w-3.5"/>
                                                                        </span>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>Eliminar fecha</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Dialog open={addCustomDateOpen} onOpenChange={setAddCustomDateOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" className="gap-1">
                                            <PlusCircle className="h-3.5 w-3.5"/>
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Agregar fecha
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Fecha</DialogTitle>
                                            <DialogDescription>
                                                Complete la información de la fecha para su creación.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2 mb-3">
                                                <Label htmlFor="name">Nombre</Label>
                                                <Input name="name"
                                                       id="name"
                                                       placeholder="Ingrese el nombre de la fecha..."
                                                       onChange={handleInputNameNewCustomDateChange}
                                                       value={newCustomDate.name}
                                                />
                                            </div>
                                            <div className="grid gap-2 mb-3">
                                                <Label htmlFor="description">Descripción</Label>
                                                <Textarea name="description"
                                                          id="description"
                                                          placeholder="Ingrese la descripcion de la fecha..."
                                                          onChange={handleInputDescriptionNewCustomDateChange}
                                                          value={newCustomDate.description}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button size="sm" variant="ghost" className="gap-1"
                                                    onClick={handleAddCustomDate}
                                                    disabled={newCustomDate.name === "" || newCustomDate.description === ""}
                                            >
                                                <PlusCircle className="h-3.5 w-3.5"/>
                                                Agregar fecha
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                            <CardFooter className="border-t px-6 py-4">
                                <Button
                                    onClick={saveChanges}
                                    disabled={saveChangesLoading || saveChangesDisabled}
                                    className="bg-green-600">
                                    {saveChangesLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
                                    Guardar cambios
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

const initConfig = (dates) => {
    return {
        dates: dates.map((date) => {
            return {
                name: date.name,
                label: date.label,
                description: date.description,
                is_mandatory: date.is_mandatory,
                time: toTime(date.time),
                date: toDate(date.date),
                show_time: date.time !== null && date.time !== "",
                date_open: false,
            }
        })
    }
}

const saveConfig = (editedDateConfiguration) => {
    return {
        dates: editedDateConfiguration.dates.map((date) => {
            return {
                name: date.is_mandatory ? date.name : null,
                label: date.label,
                description: date.description,
                is_mandatory: date.is_mandatory,
                time: toFormatedTime(date.time),
                date: toFormatedDate(date.date)
            }
        })
    }
}

const defaultNewCustomDate = {
    name: "",
    label: "",
    description: "",
    is_mandatory: false,
    show_time: false,
    date_open: false,
    time: null,
    date: null
}
