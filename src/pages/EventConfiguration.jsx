import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea"
import {MultipleSelector} from "@/components/ui/multiple-selector.jsx"
import {useToast} from '@/components/ui/use-toast';
import {useEffect, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import EventHeader from "@/features/events/components/EventHeader.jsx";
import {apiGetEventById, apiGetEventConfigurationById, apiPutEventConfiguration} from "@/services/api/eventServices.js";
import {Loader2} from "lucide-react";
import {defaultEventConfig} from "@/lib/utils.js";

export default function EventConfiguration() {
    const {toast} = useToast();
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
    const [changeSaved, setChangeSaved] = useState(true); //todo
    const [event, setEvent] = useState(defaultEventConfig);
    const [eventConfiguration, setEventConfiguration] = useState(defaultConfig);
    const [editedGeneralConfiguration, setEditedGeneralConfiguration] = useState(defaultConfig);
    const [notificationsMails, setNotificationsMails] = useState([]);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        refreshData().then(r => console.log("Event configuration loaded."));
    }, []);

    const refreshData = async () => {
        const event = !location.state?.event ? await apiGetEventById(id) : location.state.event;
        const eventConfiguration = !location.state?.eventConfiguration ?
            await apiGetEventConfigurationById(id) :
            location.state.eventConfiguration;
        setEvent(event)
        setEventConfiguration(eventConfiguration);
        setEditedGeneralConfiguration(initConfig(eventConfiguration));
        setNotificationsMails(eventConfiguration.notification_mails.map(mapToMultiSelectOption));
        setTracks(eventConfiguration.tracks.map(mapToMultiSelectOption));
    };

    const saveChanges = async () => {
        setSaveChangesLoading(true);
        const newGeneralConfig = saveConfig(editedGeneralConfiguration);
        apiPutEventConfiguration(id, "general", newGeneralConfig)
            .then(r => {
                const newEvent = {...event, ...newGeneralConfig};
                const newEventConfig = {...eventConfiguration, ...newGeneralConfig}
                toast({
                    title: `Cambios guardados correctamente.`,
                });
                navigate(`/events/${id}/configuration`, {state: {event: newEvent, eventConfiguration: newEventConfig}});
                console.log("general configuration saved.");
            })
        setSaveChangesLoading(false);
        setSaveChangesDisabled(true);
    }

    const handleInputChange = (e) => {
        setChangeSaved(false) //todo para que es
        const {name, value} = e.target;
        setEditedGeneralConfiguration({...editedGeneralConfiguration, [name]: value});
        setSaveChangesDisabled(false);
    };

    const handleSelectType = (value) => {
        setEditedGeneralConfiguration({...editedGeneralConfiguration, event_type: value});
        setSaveChangesDisabled(false);
    };

    const handleNonDecidedLocationCheckBox = (value) => {
        setEditedGeneralConfiguration({...editedGeneralConfiguration, location: "", non_decided_location: value});
        setSaveChangesDisabled(false);
    };

    const handleOnlyAdminNotificationsCheckBox = (value) => {
        setNotificationsMails([]);
        setEditedGeneralConfiguration({
            ...editedGeneralConfiguration,
            notification_mails: [],
            only_admin_notifications: value
        });
        setSaveChangesDisabled(false);
    };

    const handleValidateMultiSelectMail = (option) => {
        const validationMailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = validationMailRegex.test(option.value);
        if (!result) {
            toast({
                title: `Email inválido. Asegúrese de que tenga el siguiente formato: ejemplo@email.com`,
            });
        }
        return result;
    }

    const handleValidateTracks = (option) => {
        const isValid = option.value.length <= 20
        if (!isValid) {
            toast({
                title: `Track inválido. Asegúrese de que el tamaño sea como máximo de 20 caracteres`
            });
        }
        return isValid
    }

    const handleMultiSelectMail = (selectedMails) => {
        setNotificationsMails(selectedMails.map(sm => mapToMultiSelectOption(sm.value)));
        setEditedGeneralConfiguration({
            ...editedGeneralConfiguration,
            notifications_mails: selectedMails.map(sm => sm.value)
        });
        setSaveChangesDisabled(false);
    };

    const handleMultiSelectTracks = (selectedTracks) => {
        setTracks(selectedTracks.map(sm => mapToMultiSelectOption(sm.value)))
        setEditedGeneralConfiguration({...editedGeneralConfiguration, tracks: selectedTracks.map(s => s.value)})
        setSaveChangesDisabled(false);
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
                                  editedGeneralConfiguration
                              }}
                              className="font-semibold text-primary">
                            General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedGeneralConfiguration
                              }}
                        >
                            Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedGeneralConfiguration
                              }}
                        >
                            Trabajos</Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedGeneralConfiguration
                              }}
                        >
                            Tarifas</Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedGeneralConfiguration
                              }}
                        >
                            Miembros</Link>
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
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="title">Título</Label>
                                    <Input name="title"
                                           id="title"
                                           placeholder="Ingrese el título del evento..."
                                           onChange={handleInputChange}
                                           value={editedGeneralConfiguration.title}
                                           disabled/>
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea name="description"
                                              id="description"
                                              placeholder="Ingrese un descripción para el evento..."
                                              onChange={handleInputChange}
                                              value={editedGeneralConfiguration.description}
                                              disabled/>
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="description">Tipos de evento</Label>
                                    <Select value={editedGeneralConfiguration.event_type}
                                            onValueChange={handleSelectType} disabled>
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
                                <div className="grid gap-2 mb-2">
                                    <Label htmlFor="notifications">Notificaciones</Label>
                                    <MultipleSelector
                                        id="notifications"
                                        name="notifications"
                                        value={notificationsMails}
                                        onChange={handleMultiSelectMail}
                                        onValidateCreatable={handleValidateMultiSelectMail}
                                        creatable={true}
                                        disabled={editedGeneralConfiguration.only_admin_notifications}
                                        hideClearAllButton={true}
                                        hidePlaceholderWhenSelected={false}
                                        maxSelected={5}
                                        onMaxSelected={(maxLimit) => {
                                            toast({
                                                title: `Has alcanzado la cantidad máxima de casillas de mail: ${maxLimit}`,
                                            });
                                        }}
                                        placeholder="Agregue los mails a los cuales desea notificar..."
                                    ></MultipleSelector>
                                </div>
                                <div className="flex items-center space-x-2 gap-2 mb-5">
                                    <Checkbox id="onlyAdmin"
                                              checked={editedGeneralConfiguration.only_admin_notifications}
                                              onCheckedChange={handleOnlyAdminNotificationsCheckBox}/>
                                    <label
                                        htmlFor="onlyAdmin"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Solo notificaciones a los organizadores.
                                    </label>
                                </div>
                                <div className="gap-2 mb-5">
                                    <Label htmlFor="tracks">Tracks</Label>
                                    <MultipleSelector
                                        id="tracks"
                                        name="tracks"
                                        value={tracks}
                                        onChange={handleMultiSelectTracks}
                                        onValidateCreatable={handleValidateTracks}
                                        creatable={true}
                                        hideClearAllButton={true}
                                        hidePlaceholderWhenSelected={false}
                                        maxSelected={10}
                                        onMaxSelected={(maxLimit) => {
                                            toast({
                                                title: `Has alcanzado la cantidad máxima de tracks: ${maxLimit}`,
                                            });
                                        }}
                                        placeholder="Agregue los tracks que desea ..."
                                    ></MultipleSelector>
                                </div>
                                <div className="grid gap-2 mb-2">
                                    <Label htmlFor="location">Ubicación</Label>
                                    <Input name="location"
                                           id="location"
                                           placeholder="Ingrese la ubicación del evento..."
                                           onChange={handleInputChange}
                                           value={editedGeneralConfiguration.location}
                                           disabled={editedGeneralConfiguration.non_decided_location}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 gap-2 mb-5">
                                    <Checkbox id="include" checked={editedGeneralConfiguration.non_decided_location}
                                              onCheckedChange={handleNonDecidedLocationCheckBox}/>
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Todavia no decido la ubicación del evento.
                                    </label>
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="contact">Contacto</Label>
                                    <Input name="contact"
                                           id="contact"
                                           placeholder="Ingrese el contacto del evento..."
                                           onChange={handleInputChange}
                                           value={editedGeneralConfiguration.contact}
                                    />
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="organized_by">Organizado por</Label>
                                    <Input name="organized_by"
                                           id="organized_by"
                                           placeholder="Ingrese el organizador del evento..."
                                           onChange={handleInputChange}
                                           value={editedGeneralConfiguration.organized_by}
                                    />
                                </div>
                            </CardContent>
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
        title: actualConfiguration.title,
        description: actualConfiguration.description,
        event_type: actualConfiguration.event_type,
        location: actualConfiguration.location,
        non_decided_location: !actualConfiguration.location || actualConfiguration.location === "",
        contact: actualConfiguration.contact,
        organized_by: actualConfiguration.organized_by,
        tracks: actualConfiguration.tracks,
        notification_mails: actualConfiguration.notification_mails,
        only_admin_notifications: !actualConfiguration.notification_mails || actualConfiguration.notification_mails.length === 0
    }
}

const saveConfig = (editedGeneralConfiguration) => {
    return {
        location: editedGeneralConfiguration.location,
        contact: editedGeneralConfiguration.contact,
        organized_by: editedGeneralConfiguration.organized_by,
        tracks: editedGeneralConfiguration.tracks,
        notification_mails: editedGeneralConfiguration.notification_mails
    }
}

const mapToMultiSelectOption = (option) => {
    return {key: option, label: option, value: option, fixed: false, disable: false}
}

const defaultConfig = {
    title: "",
    description: "",
    event_type: "",
    location: "",
    contact: "",
    organized_by: "",
    tracks: [],
    notification_mails: []
}


