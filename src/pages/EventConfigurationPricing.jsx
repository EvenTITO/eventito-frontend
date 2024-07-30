import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import EventHeader from "@/features/events/components/EventHeader.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Info, Loader2, MinusCircle, PlusCircle} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.jsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.jsx";
import {Textarea} from "@/components/ui/textarea.jsx";
import {apiGetEventById, apiGetEventConfigurationById, apiPutEventConfiguration} from "@/services/api/eventServices.js";
import {defaultEventConfig} from "@/lib/utils.js";
import {toast} from "@/components/ui/use-toast.js";

export default function EventConfigurationPricing() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
    const [event, setEvent] = useState(defaultEventConfig);
    const [eventConfiguration, setEventConfiguration] = useState(defaultConfig);
    const [editedPricingConfiguration, setEditedPricingConfiguration] = useState(defaultConfig);
    const [addRateOpen, setAddRateOpen] = useState(false);
    const [newRate, setNewRate] = useState(defaultNewRate);

    useEffect(() => {
        refreshData().then(r => console.log("Event configuration pricing loaded."));
    }, [id]);

    const refreshData = async () => {
        const event = !location.state?.event ? await apiGetEventById(id) : location.state.event;
        const eventConfiguration = !location.state?.eventConfiguration ?
            await apiGetEventConfigurationById(id) :
            location.state.eventConfiguration;
        setEvent(event)
        setEventConfiguration(eventConfiguration);
        setEditedPricingConfiguration(initConfig(eventConfiguration.pricing));
    };

    const saveChanges = async () => {
        setSaveChangesLoading(true);
        const newPricingConfig = editedPricingConfiguration;
        apiPutEventConfiguration(id, "pricing", newPricingConfig)
            .then(r => {
                const newEvent = {...event, pricing: newPricingConfig};
                const newEventConfiguration = {...eventConfiguration, pricing: newPricingConfig};
                toast({
                    title: `Cambios guardados correctamente.`,
                });
                navigate(`/events/${id}/configuration/pricing`, {
                    state: {
                        event: newEvent,
                        eventConfiguration: newEventConfiguration
                    }
                });
                console.log("pricing configuration saved.");
            })
        setSaveChangesLoading(false);
        setSaveChangesDisabled(true);
    };

    const handleIsFreeCheckBox = (value) => {
        value === true ?
            setEditedPricingConfiguration({rates: [], is_free: value}) :
            setEditedPricingConfiguration({rates: editedPricingConfiguration.rates, is_free: value})
        setSaveChangesDisabled(false);

    };

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        const nextRates = editedPricingConfiguration.rates.map((rate, index) => {
            if (index.toString() === id) {
                return {...rate, value: value};
            }
            return rate;
        })
        setEditedPricingConfiguration({...editedPricingConfiguration, rates: nextRates});
        setSaveChangesDisabled(false);
    };

    const handleNeedFileCheckBox = (index, value) => {
        const nextRates = editedPricingConfiguration.rates.map((rate, i) => {
            if (i === index) {
                return {...rate, need_verification: value};
            }
            return rate;
        })
        setEditedPricingConfiguration({...editedPricingConfiguration, rates: nextRates});
        setSaveChangesDisabled(false);
    }

    const handleNewRateNeedFileCheckBox = (value) => {
        setNewRate({...newRate, need_verification: value});
    };

    const handleInputNewRateChange = (e) => {
        const {name, value} = e.target;
        setNewRate({...newRate, [name]: value});
    };

    const handleAddRate = () => {
        setEditedPricingConfiguration({
            ...editedPricingConfiguration,
            rates: [...editedPricingConfiguration.rates, newRate]
        });
        setAddRateOpen(false);
        setNewRate(defaultNewRate);
    }

    const handleDeleteRate = (index) => {
        const nextRates = editedPricingConfiguration.rates.filter((rate, i) => i !== index);
        setEditedPricingConfiguration({
            rates: nextRates,
            is_free: nextRates.length === 0
        });
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <HeaderDivisor/>
            <EventHeader event={event}/>
            <main
                className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto grid w-full max-w-6xl gap-2">
                    <h1 className="text-3xl font-semibold">Editar evento</h1>
                </div>
                <div
                    className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                    <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                        <Link to={`/events/${id}/configuration`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedPricingConfiguration
                              }}
                        >General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedPricingConfiguration
                              }}
                        >Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedPricingConfiguration
                              }}
                        >Trabajos
                        </Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedPricingConfiguration
                              }}
                              className="font-semibold text-primary"
                        >Tarifas
                        </Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedPricingConfiguration
                              }}
                        >Miembros
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Tarifas</CardTitle>
                                <CardDescription>
                                    Descripción de las tarifas del evento.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center space-x-2 mb-5">
                                    <Checkbox id="isFree" checked={editedPricingConfiguration?.is_free}
                                              onCheckedChange={handleIsFreeCheckBox}/>
                                    <label
                                        htmlFor="isFree"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        El evento es gratuito.
                                    </label>
                                </div>
                                {editedPricingConfiguration &&
                                    !editedPricingConfiguration.is_free &&
                                    editedPricingConfiguration.rates &&
                                    editedPricingConfiguration.rates.map((rate, i) => {
                                        return (
                                            <div className="grid gap-2 mb-3" key={i}>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <div className="flex space-x-0.5">
                                                                <Label htmlFor="title">{rate.name}</Label>
                                                                <Info className="h-3.5 w-3.5"/>
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-96">
                                                            <p className="text-sm text-muted-foreground">{rate.description}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                <div className="flex items-center">
                                                    <Input name={rate.name}
                                                           id={i}
                                                           type="number"
                                                           placeholder="Ingrese tarifa..."
                                                           onChange={handleInputChange}
                                                           value={rate.value}
                                                    />
                                                    <Button size="sm" variant="ghost" className="gap-1"
                                                            onClick={() => handleDeleteRate(i)}>
                                                        <MinusCircle className="h-3.5 w-3.5"/>
                                                    </Button>
                                                </div>
                                                {rate.name !== "Tarifa general" && (
                                                    <div className="flex items-center space-x-2 mb-5">
                                                        <Checkbox id="needFile" checked={rate.need_verification}
                                                                  onCheckedChange={(value) => handleNeedFileCheckBox(i, value)}/>
                                                        <label
                                                            htmlFor="needFile"
                                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            La tarifa necesita la carga de un comprobante.
                                                        </label>
                                                    </div>)}
                                            </div>
                                        )
                                    })}
                            </CardContent>
                            {editedPricingConfiguration && !editedPricingConfiguration.is_free && (
                                <CardFooter className="justify-center border-t p-4">
                                    <Dialog open={addRateOpen} onOpenChange={setAddRateOpen}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="ghost" className="gap-1">
                                                <PlusCircle className="h-3.5 w-3.5"/>
                                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Agregar tarifa
                                            </span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Tarifa</DialogTitle>
                                                <DialogDescription>
                                                    Complete la información de la tarifa para su creación.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2 mb-3">
                                                    <Label htmlFor="title">Nombre</Label>
                                                    <Input name="name"
                                                           id="name"
                                                           placeholder="Ingrese el nombre de la tarifa..."
                                                           onChange={handleInputNewRateChange}
                                                           value={newRate.name}
                                                    />
                                                </div>
                                                <div className="grid gap-2 mb-3">
                                                    <Label htmlFor="title">Descripción</Label>
                                                    <Textarea name="description"
                                                              id="description"
                                                              placeholder="Ingrese la descripcion de la tarifa..."
                                                              onChange={handleInputNewRateChange}
                                                              value={newRate.description}
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-2 mb-5">
                                                    <Checkbox id="newRateNeedFile" checked={newRate.need_verification}
                                                              onCheckedChange={handleNewRateNeedFileCheckBox}/>
                                                    <label
                                                        htmlFor="newRateNeedFile"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        La tarifa necesita la carga de un comprobante.
                                                    </label>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button size="sm" variant="ghost" className="gap-1"
                                                        onClick={handleAddRate}
                                                        disabled={newRate.name === "" || newRate.description === ""}
                                                >
                                                    <PlusCircle className="h-3.5 w-3.5"/>
                                                    Agregar tarifa
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>)}
                            <CardFooter className="border-t px-6 py-4">
                                <Button
                                    onClick={saveChanges}
                                    disabled={saveChangesLoading || saveChangesDisabled}
                                    className="bg-green-600">
                                    {saveChangesLoading && (<Loader2 className="mr-2 h-4 w-4 animate-spin"/>)}
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

const initConfig = (actualConfiguration) => {
    return {
        rates: actualConfiguration ? actualConfiguration.rates : [],
        is_free: actualConfiguration && actualConfiguration.rates ? actualConfiguration.rates.length === 0 : true,
    }
}

const defaultConfig = {
    rates: [],
    is_free: true
}

const defaultNewRate = {
    name: "",
    value: "",
    description: "",
    need_verification: false,
    is_free: true
}
