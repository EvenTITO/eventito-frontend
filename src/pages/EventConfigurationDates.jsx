import {Link, useLocation, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx";
import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.jsx";
import {cn} from "@/lib/utils.js";
import {CalendarIcon, Info, MinusCircle, PlusCircle} from "lucide-react";
import {Calendar} from "@/components/ui/calendar"
import {format} from "date-fns"
import {es} from "date-fns/locale"
import {Checkbox} from "@/components/ui/checkbox.jsx";
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

export default function EventConfigurationDates() {
    const {id} = useParams();
    const location = useLocation();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [editedDates, setEditedDates] = useState(
        (location.state && location.state.editedDates) ? location.state.editedDates :
            (location.state && location.state.dates) ? location.state.dates : defaultDates
    );

    const [addCustomDateOpen, setAddCustomDateOpen] = useState(false);
    const [newCustomDate, setNewCustomDate] = useState(defaultNewCustomDate);

    const saveChanges = async () => {
        console.log("guardar cambios");
        setSaveChangesLoading(true);
        //await apiPatchEvent(); TODO
        setSaveChangesLoading(false);
    }

    const handleNonDecidedDatesCheckBox = (value) => {
        setEditedDates({...defaultDates, non_decided_dates: value});
    };

    const handleInputNewCustomDateChange = (e) => {
        const {name, value} = e.target;
        setNewCustomDate({...newCustomDate, [name]: value});
    };

    const handleAddCustomDate = () => {
        setEditedDates({...editedDates, custom_dates: [...editedDates.custom_dates, newCustomDate]});
        setAddCustomDateOpen(false);
        setNewCustomDate(defaultNewCustomDate);
    }

    const handleDeleteCustomDate = (index) => {
        const nextCustomDates = editedDates.custom_dates.filter((date, i) => i !== index);
        setEditedDates({...editedDates, custom_dates: nextCustomDates});
        setNewCustomDate(defaultNewCustomDate);
    }

    const handleCustomDateValue = (index, dateValue) => {
        const nextDates = editedDates.custom_dates.map((customDate, i) => {
            if (i === index) {
                return {...customDate, value: dateValue, custom_date_open: false};
            }
            return customDate;
        })
        setEditedDates({...editedDates, custom_dates: nextDates});
    }

    const setCustomDateOpen = (index, value) => {
        const nextDates = editedDates.custom_dates.map((customDate, i) => {
            if (i === index) {
                return {...customDate, custom_date_open: value};
            }
            return customDate;
        })
        setEditedDates({...editedDates, custom_dates: nextDates});
    }

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
                              state={{...location.state, editedDates: editedDates}}>
                            General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{...location.state, editedDates: editedDates}}
                              className="font-semibold text-primary">
                            Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{...location.state, editedDates: editedDates}}>
                            Trabajos</Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{...location.state, editedDates: editedDates}}>
                            Tarifas</Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{...location.state, editedDates: editedDates}}>
                            Miembros</Link>
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
                                <div className="flex items-center space-x-2 mb-5">
                                    <Checkbox id="include" checked={editedDates.non_decided_dates}
                                              onCheckedChange={handleNonDecidedDatesCheckBox}/>
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Todavia no decido las fechas del evento.
                                    </label>
                                </div>
                                {!editedDates.non_decided_dates && (
                                    <div>
                                        {editedDates.custom_dates && editedDates.custom_dates.map((customDate, i) => {
                                            return (
                                                <div className="grid gap-2 mb-3" key={i}>
                                                    <div className="flex items-center space-x-2">
                                                        <Label>{customDate.name}</Label>
                                                        {customDate.can_remove && (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <div className="flex space-x-0.5">
                                                                            <Info className="h-3.5 w-3.5"/>
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent className="max-w-96">
                                                                        <p className="text-sm text-muted-foreground">{customDate.description}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center">
                                                        <Popover open={customDate.custom_date_open}
                                                                 onOpenChange={(value) => setCustomDateOpen(i, value)}>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    disabled={editedDates.non_decided_dates}
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-[280px] justify-start text-left font-normal",
                                                                        !customDate.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                                                    {customDate.value ? format(customDate.value, "PPP", {locale: es}) :
                                                                        <span>Escoge una fecha</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={customDate.value}
                                                                    onSelect={(value) => handleCustomDateValue(i, value)}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        {customDate.can_remove && (
                                                            <Button size="sm" variant="ghost" className="gap-1"
                                                                    onClick={() => handleDeleteCustomDate(i)}>
                                                                <MinusCircle className="h-3.5 w-3.5"/>
                                                            </Button>)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </CardContent>
                            {!editedDates.non_decided_dates && (
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
                                                           onChange={handleInputNewCustomDateChange}
                                                           value={newCustomDate.name}
                                                    />
                                                </div>
                                                <div className="grid gap-2 mb-3">
                                                    <Label htmlFor="description">Descripción</Label>
                                                    <Textarea name="description"
                                                              id="description"
                                                              placeholder="Ingrese la descripcion de la fecha..."
                                                              onChange={handleInputNewCustomDateChange}
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
                                </CardFooter>)}
                            <CardFooter className="border-t px-6 py-4">
                                <Button
                                    onClick={saveChanges}
                                    disabled={saveChangesLoading || location.state.dates === editedDates}
                                    className="bg-green-600">
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

const defaultDates = {
    custom_dates: [
        {name: "Fecha de inicio", value: "", description: "", custom_date_open: false, can_remove: false},
        {name: "Fecha de finalización", value: "", description: "", custom_date_open: false, can_remove: false},
        {
            name: "Fecha límite de envío de trabajos",
            value: "",
            description: "",
            custom_date_open: false,
            can_remove: false
        }
    ],
    non_decided_dates: true
}

const defaultNewCustomDate = {
    name: "",
    value: "",
    description: "",
    custom_date_open: false,
    can_remove: true
}
