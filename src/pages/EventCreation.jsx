import {Link, useLocation, useNavigate} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea"
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";

export default function EventCreation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [event, setEvent] = useState(location.state != null && location.state.event ? location.state.event : defaultEvent);

    const nextCreationStep = () => {
        navigate("/events/creation/calendar", {state: {...location.state, event:event}});
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEvent({...event, [name]: value});
    };

    const handleSelectType = (value) => {
        setEvent({...event, type: value});
    };

    const handleNonDecidedLocationCheckBox = (value) => {
        setEvent({...event, location:"", nonDecidedLocation: value});
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
                    <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                        <Link to="/events/creation/general"
                              state={{...location.state, event:event}}
                              className="font-semibold text-primary">
                            General
                        </Link>
                        <Link to="/events/creation/calendar"
                              state={{...location.state, event:event}}>
                            Calendario</Link>
                        <Link to="/events/creation/work"
                              state={{...location.state, event:event}}>
                            Trabajos</Link>
                        <Link to="/events/creation/pricing"
                              state={{...location.state, event:event}}>
                            Tarifas</Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Descripción general</CardTitle>
                                <CardDescription>
                                    Usada para identificar tu evento en la plataforma.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="title">Título</Label>
                                    <Input name="title"
                                           id="title"
                                           placeholder="Ingrese el título del evento..."
                                           onChange={handleInputChange}
                                           value={event.title}
                                           required/>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea name="description"
                                              id="description"
                                              placeholder="Ingrese un descripción para el evento..."
                                              onChange={handleInputChange}
                                              value={event.description}
                                              required/>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="description">Tipos de evento</Label>
                                    <Select value={event.type} onValueChange={handleSelectType}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Tipos de evento</SelectLabel>
                                                <SelectItem value="CONFERENCE">Conferencia</SelectItem>
                                                <SelectItem value="TALK">Charla</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2 mb-3">
                                    <Label htmlFor="location">Ubicación</Label>
                                    <Input name="location"
                                           id="location"
                                           placeholder="Ingrese la ubicación del evento..."
                                           onChange={handleInputChange}
                                           value={event.location}
                                           disabled={event.nonDecidedLocation}
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="include" checked={event.nonDecidedLocation} onCheckedChange={handleNonDecidedLocationCheckBox}/>
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Todavia no decido la ubicación del evento.
                                    </label>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button onClick={nextCreationStep}>Siguiente</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}

const defaultEvent = {
    title: "",
    description: "",
    type: "CONFERENCE",
    location: "",
    nonDecidedLocation: false
}
