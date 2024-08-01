import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useEffect, useState} from "react";
import EventHeader from "@/features/events/components/EventHeader.jsx";
import {apiGetEventById, apiGetEventConfigurationById, apiPutEventConfiguration} from "@/services/api/eventServices.js";
import {Loader2} from "lucide-react";
import {defaultEventConfig} from "@/lib/utils.js";
import {toast} from "@/components/ui/use-toast.js";

export default function EventConfigurationSubmissions() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [saveChangesDisabled, setSaveChangesDisabled] = useState(true);
    const [event, setEvent] = useState(defaultEventConfig);
    const [eventConfiguration, setEventConfiguration] = useState({});
    const [editedSubmissionConfiguration, setEditedSubmissionConfiguration] = useState({});

    useEffect(() => {
        refreshData().then(r => console.log("Event configuration submissions loaded."));
    }, [id]);

    const refreshData = async () => {
        const event = !location.state?.event ? await apiGetEventById(id) : location.state.event;
        const eventConfiguration = !location.state?.eventConfiguration ?
            await apiGetEventConfigurationById(id) :
            location.state.eventConfiguration;
        setEvent(event)
        setEventConfiguration(eventConfiguration);
        setEditedSubmissionConfiguration(eventConfiguration.review_skeleton);
    };

    const saveChanges = async () => {
        setSaveChangesLoading(true);
        const newDateConfig = editedSubmissionConfiguration;
        apiPutEventConfiguration(id, "review-skeleton", newDateConfig)
            .then(r => {
                const newEventConfiguration = {...eventConfiguration, review_skeleton: newDateConfig};
                toast({
                    title: `Cambios guardados correctamente.`,
                });
                navigate(`/events/${id}/configuration/work`, {
                    state: {
                        event: event,
                        eventConfiguration: newEventConfiguration
                    }
                });
                console.log("review skeleton configuration saved.");
            })
        setSaveChangesLoading(false);
        setSaveChangesDisabled(true);
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
                    <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
                        <Link to={`/events/${id}/configuration`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedSubmissionConfiguration
                              }}
                        >General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedSubmissionConfiguration
                              }}
                        >Fechas
                        </Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedSubmissionConfiguration
                              }}
                              className="font-semibold text-primary"
                        >Trabajos
                        </Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedSubmissionConfiguration
                              }}
                        >Tarifas
                        </Link>
                        <Link to={`/events/${id}/configuration/members`}
                              state={{
                                  event,
                                  eventConfiguration,
                                  editedSubmissionConfiguration
                              }}
                        >Miembros
                        </Link>
                    </nav>
                    <div className="grid gap-6">
                        <Card x-chunk="dashboard-04-chunk-1">
                            <CardHeader>
                                <CardTitle>Trabajos</CardTitle>
                                <CardDescription>
                                    Reglas para la corrección y entrega de los trabajos.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
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

const defaultWork = {}
