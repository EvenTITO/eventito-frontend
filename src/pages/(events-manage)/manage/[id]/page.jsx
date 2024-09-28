import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Clock, Edit2, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionMain,
  MotionP,
} from "./_components/Animation";
import ContainerOrganizationPage from "./_components/ContainerOrganizationPage";
import ImageHeader from "./_components/ImageHeader";
import ButtonWithLoading from "@/components/ButtonWithLoading";
import { useEditEvent, useUploadEventImage } from "@/hooks/manage/generalHooks";

export default function Page({ eventInfo }) {
  const [event, setEvent] = useState(eventInfo);
  const [isEditing, setIsEditing] = useState(false);
  const { mutateAsync: submitEditEvent, isPending, error } = useEditEvent();
  const { mutateAsync: uploadEventImage } = useUploadEventImage();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (index, field, value) => {
    setEvent((prev) => ({
      ...prev,
      dates: prev.dates.map((date, i) =>
        i === index ? { ...date, [field]: value } : date,
      ),
    }));
  };

  const handleSave = async () => {
    await submitEditEvent({ eventData: event });
    setIsEditing(false);
  };

  //TODO @gonzasabation con esta funcion subis cualquier imagen del evento
  // parametrizar para elegir cual de las 3 imagenes subir (banner_image, main_image, brochure)
  const uploadFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadEventImage({ imageName: "banner_image", image: file });
    }
  };

  return (
    <ContainerOrganizationPage>
      <ImageHeader
        image={event.media.find((item) => item.name === "banner_image")}
      />
      <MotionMain className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          {isEditing ? (
            <Input
              name="title"
              value={event.title}
              onChange={handleInputChange}
              className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 px-0"
            />
          ) : (
            <MotionH1 className="text-4xl font-bold">{event.title}</MotionH1>
          )}
          {!isEditing && (
            <Button
              variant="table"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          )}
        </div>

        <MotionDiv className="space-y-4 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-muted-foreground" />
              {isEditing ? (
                <div className="flex items-center">
                  <Input
                    name="organized_by"
                    value={event.organized_by}
                    onChange={handleInputChange}
                    className="border-none shadow-none focus-visible:ring-0 px-0 w-auto"
                  />
                </div>
              ) : (
                <span>
                  <span className="text-muted-foreground">Organizado por:</span>{" "}
                  {event.organized_by}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0" />
              {isEditing ? (
                <div className="flex items-center flex-grow">
                  <Input
                    name="location"
                    value={event.location}
                    onChange={handleInputChange}
                    className="border-none shadow-none focus-visible:ring-0 px-0 w-full"
                  />
                </div>
              ) : (
                <span className="break-words">
                  <span className="text-muted-foreground">Ubicación:</span>{" "}
                  {event.location}
                </span>
              )}
            </div>
          </div>
        </MotionDiv>

        <MotionDiv className="space-y-6 mb-12">
          <MotionH2 className="text-2xl font-semibold">Calendar</MotionH2>
          <div className="space-y-4">
            {event.dates.map((date, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <CalendarDays className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="font-medium">{date.description}</p>
                    {isEditing ? (
                      <div className="flex items-center space-x-2 mt-1">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[240px] justify-start text-left font-normal"
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {date.date
                                ? format(new Date(date.date), "PPP")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                date.date ? new Date(date.date) : undefined
                              }
                              onSelect={(newDate) =>
                                handleDateChange(
                                  index,
                                  "date",
                                  newDate ? format(newDate, "yyyy-MM-dd") : "",
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Input
                          type="time"
                          value={date.time}
                          onChange={(e) =>
                            handleDateChange(index, "time", e.target.value)
                          }
                          className="w-[120px]"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(`${date.date}T${date.time}`), "PPP p")}
                      </p>
                    )}
                  </div>
                </div>
                {!isEditing && (
                  <Clock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv className="prose max-w-none mb-12">
          <MotionH2 className="text-2xl font-semibold mb-4">
            Sobre el evento
          </MotionH2>
          {isEditing ? (
            <Textarea
              name="description"
              value={event.description}
              onChange={handleInputChange}
              rows={5}
              className="w-full border-none shadow-none focus-visible:ring-0 px-0 resize-none"
            />
          ) : (
            <MotionP>{event.description}</MotionP>
          )}
        </MotionDiv>

        {isEditing && (
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-end">
            <ButtonWithLoading
              onClick={handleSave}
              className={"size-lg"}
              isLoading={isPending}
            >
              Guardar cambios
            </ButtonWithLoading>
          </div>
        )}
      </MotionMain>
    </ContainerOrganizationPage>
  );
}
