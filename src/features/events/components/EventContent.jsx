import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Badge} from "@/components/ui/badge";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {Calendar, Info, MapPin, Share} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import Logo from "@/assets/logo.svg";
import {useRef, useState} from "react";
import {apiUploadFile, getUploadUrl} from "@/services/storage/storageService.js";

export default function EventContent({event, refreshData}) {
    return (
        <main className="flex min-h-[calc(100vh_-_th me(spacing.16))] flex-1 flex-col gap-8 bg-white">
            <div className="w-full">
                <EvenTitle event={event}/>
            </div>
            <div>
                <EventInfo event={event}/>
            </div>
            <div className="flex gap-2 mt-6">
                <div className="w-[300px]">
                    <EventMainImage event={event} refreshData={refreshData}/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <Contact/>
                </div>
            </div>
        </main>
    );
}

function EvenTitle({event}) {
    return (
        <div>
            <div className="flex flex-row grid-cols-3 gap-8">
                <div className="w-full flex gap-4">
                    <h1 className="text-3xl font-semibold">{event.title}</h1>
                    <div>
                        <Badge variant="outline" className={"bg-slate-50 text-red-700"}>Últimos cupos!</Badge>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="flex justify-end gap-4">
                        <Button variant="outline" className="bg-eventitoBlue text-white">Inscribirme</Button>
                        <Button variant="outline" className=""><Share className="size-4"/></Button>
                    </div>
                </div>
            </div>
            <div className="flex gap-1 items-center text-slate-500 font-semibold">
                Organizado por: Departamento de Química
            </div>
        </div>
    );
}

function EventInfo({event}) {
    return (
        <div className="flex flex-row grid-cols-3 gap-12 items-start">
            <div className="w-full flex flex-col gap-8">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Sobre el evento</h2>
                    <p>{event.description}</p>
                </div>
            </div>
            <div className="w-1/3">
                <div className="space-y-1">
                    <h4 className="text-lg font-medium leading-none flex gap-2">
                        <Info className="size-4"/> Información del evento
                    </h4>
                </div>
                <Separator className="my-4 border"/>
                <div className="flex flex-col gap-2">
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div className="flex gap-2 w-full"><Calendar className="size-4"/>Comienzo</div>
                        <Separator orientation="vertical"/>
                        <div className="w-full">{event.start_date}</div>
                    </div>
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div className="flex gap-2 w-full"><Calendar className="size-4"/>Finalización</div>
                        <Separator orientation="vertical"/>
                        <div className="w-full">{event.end_date}</div>
                    </div>
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <div className="flex gap-2 w-full"><MapPin className="size-4"/>Ubicación</div>
                        <Separator orientation="vertical"/>
                        <div className="w-full">FIUBA - Paseo Colon</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Contact() {
    return (
        <Tabs defaultValue="contacto" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contacto">Contacto</TabsTrigger>
                <TabsTrigger value="prensa">Prensa y Difusión</TabsTrigger>
            </TabsList>
            <TabsContent value="contacto">
                <Card>
                    <CardHeader>
                        <CardTitle>Contacto</CardTitle>
                        <CardDescription>
                            jiafes@gmail.com
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="prensa">
                <Card>
                    <CardHeader>
                        <CardTitle>Prensa y Difusión</CardTitle>
                        <CardDescription>
                            El material disponible aquí puede ser utilizado libremente con fines promocionales para
                            difundir el evento en ámbitos de interés científico y tecnológico, tanto académicos como de
                            interés general, con alcance a nivel nacional e internacional.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}

function EventMainImage({event, refreshData}) {
    const showImagePicker = useRef(false);
    const enableEditMainImage = useState(event.roles.includes("ORGANIZER"))
    const [isHovered, setIsHovered] = useState(false);

    const handleUpdateMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            getUploadUrl(event.id)
                .then(uploadInfo => {
                    apiUploadFile(uploadInfo.upload_url, file)
                        .then((res) => {
                            console.log("Imagen del evento actualizada");
                            refreshData().then(r => console.log("Event loaded"));
                        });
                })
                .catch(() => console.log("No se puedo actualizar la imagen del evento"))
        }
    }

    const handleClick = () => {
        showImagePicker.current.click();
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <button onClick={handleClick} disabled={!enableEditMainImage}>
                <img
                    src={event.main_image_url != null ? event.main_image_url : Logo}
                    onError={event => {
                        event.target.src = Logo
                        event.onerror = null
                    }}
                    style={{
                        opacity: isHovered ? 0.7 : 1,
                        transition: 'opacity 0.3s',
                    }}
                />
            </button>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpdateMainImage}
                ref={showImagePicker}
                style={{display: 'none'}}
            />
        </div>
    )
}
