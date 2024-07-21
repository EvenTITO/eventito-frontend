import {Link, useLocation, useParams} from "react-router-dom";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import HeaderDivisor from "@/components/ui/HeaderDivisor.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";
import EventHeader from "@/features/events/components/EventHeader.jsx";

export default function EventConfigurationSubmissions() {
    const location = useLocation();
    const {id} = useParams();
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);
    const [editedWork, setEditedWork] = useState(
        (location.state && location.state.editedWork) ? location.state.editedWork :
            (location.state && location.state.work) ? location.state.work : defaultWork);

    const saveChanges = async () => {
        console.log("guardar cambios");
        setSaveChangesLoading(true);
        //await apiPatchEvent(); TODO
        setSaveChangesLoading(false);
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
                              state={{...location.state, editedWork: editedWork}}
                        >
                            General
                        </Link>
                        <Link to={`/events/${id}/configuration/dates`}
                              state={{...location.state, editedWork: editedWork}}>
                            Fechas</Link>
                        <Link to={`/events/${id}/configuration/work`}
                              state={{...location.state, editedWork: editedWork}}
                              className="font-semibold text-primary"
                        >
                            Trabajos</Link>
                        <Link to={`/events/${id}/configuration/pricing`}
                              state={{...location.state, editedWork: editedWork}}>
                            Tarifas</Link>
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
                                    disabled={saveChangesLoading || location.state.work === editedWork}
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

const defaultWork = {}
