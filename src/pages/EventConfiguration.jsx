import {Link, useLocation, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Textarea} from "@/components/ui/textarea"
import {MultipleSelector} from "@/components/ui/multiple-selector.jsx"
import {useToast} from '@/components/ui/use-toast';
import {useState, useEffect } from "react";
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
import {useSelector} from "react-redux";

import { apiGetEventFor, apiPutEventFor } from "@/services/api/eventServices.js";

export default function EventConfiguration() {
    const {currentUser} = useSelector((state) => state.user);
    const {toast} = useToast();
    const {id} = useParams();
    const location = useLocation();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [editedEvent, setEditedEvent] = useState(location.state.editedEvent ? location.state.editedEvent : location.state.event);
    const [notificationsMails, setNotificationsMails] = useState(
        (location.state.editedEvent && location.state.editedEvent.notifications_mails)
            ? location.state.editedEvent.notifications_mails?.map(nm => mapToMultiSelectOption(nm, currentUser.email))
            : location.state.event.notifications_mails?.map(nm => mapToMultiSelectOption(nm, currentUser.email))
    );
    const [tracks, setTracks] = useState(
        (location.state.editedEvent && location.state.editedEvent.tracks)
            ? location.state.editedEvent.tracks?.map(nm => mapToMultiSelectOption(nm, currentUser.email))
            : location.state.event.tracks?.map(nm => mapToMultiSelectOption(nm, currentUser.email))
    );
      
    const [changeSaved, setChangeSaved] = useState(true)
    useEffect(() => {
        refreshData().then(r => console.log("Event Configuration loaded"));
    }, [id]);

    const refreshData = async () => {
        const ev = await apiGetEventFor(`${id}/configuration`)
        const ne = ev.notification_mails
        if( ne && ne.length != 0){
            setNotificationsMails(ne.map( nm => mapToMultiSelectOption(nm, currentUser.email)))
        }
        const tracks = ev.tracks
        if( tracks && tracks.length != 0){
            setTracks(tracks.map( t => mapToMultiSelectOption(t, currentUser.email)))
        }
        
        editedEvent.organized_by = ev.organized_by
        editedEvent.contact = ev.contact
    };

    const saveChanges = async () => {
        console.log("guardar cambios event configuration");
        setChangeSaved(false)

        setSaveChangesLoading(true);

        const editedEv = {
            "title": editedEvent.title,
            "description": editedEvent.description,
            "event_type": editedEvent.event_type,
            "start_date": editedEvent.start_date,
            "end_date": editedEvent.end_date,
            "location": editedEvent.location,
            "tracks": tracks.map( nm => nm.value), 
            "contact": editedEvent.contact,
            "organized_by": editedEvent.organized_by,
            "notification_mails": notificationsMails.map( nm => nm.value)
        }

        await apiPutEventFor(`${id}/configuration/general`, editedEv)

        setSaveChangesLoading(false)
        setChangeSaved(true)
    }

    const handleInputChange = (e) => {
        setChangeSaved(false)

        const {name, value} = e.target;
        setEditedEvent({...editedEvent, [name]: value});
    };

    const handleSelectType = (value) => {
        setChangeSaved(false)

        setEditedEvent({...editedEvent, event_type: value});
    };

    const handleNonDecidedLocationCheckBox = (value) => {
        setChangeSaved(false)

        setEditedEvent({...editedEvent, location: "", nonDecidedLocation: value});
    };

    const handleOnlyAdminNotificationsCheckBox = (value) => {
        setChangeSaved(false)

        setNotificationsMails([mapToMultiSelectOption(currentUser.email, currentUser.email)]);
        setEditedEvent({...editedEvent, notifications_mails: [currentUser.email], only_admin_notifications: value});
    };

    const handleValidateMultiSelectMail = (option) => {
        setChangeSaved(false)

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
        setChangeSaved(false)

        const isValid = option.value.length <= 20
        if( ! isValid ){
            toast({
                title: `Track inválido. Asegúrese de que el tamaño sea como máximo de 20 caracteres`
            });
        }
        return isValid
    }

    const handleMultiSelectMail = (selectedMails) => {
        setChangeSaved(false)

        setNotificationsMails(selectedMails.map(sm => mapToMultiSelectOption(sm.value, currentUser.email)));
        setEditedEvent({...editedEvent, notifications_mails: selectedMails.map(sm => sm.value)});
    };

    const handleMultiSelectTracks = (selectedTracks) => {
        setChangeSaved(false)

        setTracks( selectedTracks.map(sm => mapToMultiSelectOption(sm.value, currentUser.email)) )
        setEditedEvent( {...editedEvent, tracks: selectedTracks.map( s => s.value)})
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
                    <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                        <Link to={`/events/${id}/configuration`}
                              state={{...location.state, editedEvent: editedEvent}}
                              className="font-semibold text-primary">
                            General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{...location.state, editedEvent: editedEvent}}>
                            Fechas</Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{...location.state, editedEvent: editedEvent}}>
                            Trabajos</Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{...location.state, editedEvent: editedEvent}}>
                            Tarifas</Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{...location.state, editedEvent: editedEvent}}>
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
                                           value={editedEvent.title}
                                           disabled/>
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea name="description"
                                              id="description"
                                              placeholder="Ingrese un descripción para el evento..."
                                              onChange={handleInputChange}
                                              value={editedEvent.description}
                                              disabled/>
                                </div>
                                <div className="grid gap-2 mb-5">
                                    <Label htmlFor="description">Tipos de evento</Label>
                                    <Select value={editedEvent.event_type} onValueChange={handleSelectType} disabled>
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
                                        disabled={editedEvent.only_admin_notifications}
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
                                <div className="grid gap-2 mb-2">
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
                                        maxSelected={5}
                                        onMaxSelected={(maxLimit) => {
                                            toast({
                                                title: `Has alcanzado la cantidad máxima de tracks de mail: ${maxLimit}`,
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
                                           value={editedEvent.location}
                                           disabled={editedEvent.nonDecidedLocation}
                                    />
                                </div>
                                <div className="flex items-center space-x-2 gap-2 mb-5">
                                    <Checkbox id="include" checked={editedEvent.nonDecidedLocation}
                                              onCheckedChange={handleNonDecidedLocationCheckBox}/>
                                    <label
                                        htmlFor="include"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Todavia no decido la ubicación del evento.
                                    </label>
                                </div>
                                <div className="grid gap-2 mb-2">
                                    <Label htmlFor="contact">Contacto</Label>
                                    <Input name="contact"
                                           id="contact"
                                           placeholder="Ingrese el contacto del evento..."
                                           onChange={handleInputChange}
                                           value={editedEvent.contact}
                                    />
                                </div>
                                <div className="grid gap-2 mb-2">
                                    <Label htmlFor="organizedBy">Organizado por</Label>
                                    <Input name="organizedBy"
                                           id="organizedBy"
                                           placeholder="Ingrese el organizador del evento..."
                                           onChange={handleInputChange}
                                           value={editedEvent.organized_by}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="border-t px-6 py-4">
                                <Button
                                    onClick={saveChanges}
                                    disabled={saveChangesLoading || changeSaved || location.state.event === editedEvent}
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

const mapToMultiSelectOption = (value, userMail) => {
    if (value === userMail) {
        return {key: value, label: value, value: value, fixed: true, disable: false}
    }
    return {key: value, label: value, value: value, fixed: false, disable: false}
}
