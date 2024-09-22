import { format } from "@formkit/tempo";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function Page({ event }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {event.media.find((item) => item.name === "banner_image") && (
        <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
          <img
            src={
              //event.media.find((item) => item.name === "banner_image").url ||
              "https://makepath.com/wp-content/uploads/2022/06/Adventure-Guide-Etsy-Banner-860-%C3%97-520-px.png"
            }
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Organized by: {event.organized_by}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="space-y-2">
            {event.dates.map((date, index) => (
              <div
                key={index}
                className="flex items-center text-sm text-muted-foreground"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(`${date.date}T${date.time}`), {
                    date: "full",
                    time: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="prose max-w-none mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sobre el evento</h2>
          <p>{event.description}</p>
        </div>
      </main>
    </div>
  );
}
