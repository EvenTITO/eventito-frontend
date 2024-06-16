import {ListFilter, PlusCircle,} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {useEffect, useState} from "react"
import {Navigate, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {addHeader} from "@/services/state/events/eventSlice"
import HeaderDivisor from "@/components/ui/HeaderDivisor"
import EventsList from "@/features/events/components/EventsList"

export default function HomePage() {
  const [eventSelected, setEventSelected] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addHeader([{ link: '/', name: 'Eventos' }]));
  }, []);

  const handleCreateEvent = () => {
    navigate(`/events/creation`)
  }

  if (eventSelected) {
    return <Navigate to={`/events/${eventSelected}`} />;
  } else {
    return (
      <>
        <HeaderDivisor />
        <div className="w-full h-full px-10">
          <div className="w-full h-full py-6 px-10">
            <main className="grid flex-1 items-start gap-4 p-4  md:gap-8">
              <Tabs defaultValue="all">
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="draft">Mis eventos</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filtrar
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Todos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Participando
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" className="h-8 gap-1" onClick={handleCreateEvent}>
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Nuevo evento
                      </span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="all">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Eventos</CardTitle>
                      <CardDescription>
                        Elegí el evento del que querés saber más.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EventsList events={events} setEventSelected={setEventSelected} />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </>
    );
  }
}

const events = [
  {
    id: 1234,
    photo_url: "https://orlandosydney.com/wp-content/uploads/2023/08/Conference-at-Darling-Harbour-Theatre-Interior-Photo%C2%B7-ICC-Sydney.-2500-seated-capacity.-Photography-By-orlandosydney.com-OS1_7156-1200x801.webp",
    title: "JIAFES 2024",
    author: "Autor JIAFES",
    start_date: "2023-07-12 10:45:00",
    end_date: "",
    event_type: "CONFERENCE",
    user_status: "Inscripto",
    location: "FIUBA - Paseo Colón"
  },
  {
    id: 1235,
    photo_url: "https://orlandosydney.com/wp-content/uploads/2023/08/Conference-at-Darling-Harbour-Theatre-Interior-Photo%C2%B7-ICC-Sydney.-2500-seated-capacity.-Photography-By-orlandosydney.com-OS1_7156-1200x801.webp",
    title: "ECI 2024",
    author: "Autor ECI",
    start_date: "2023-07-15 10:45:00",
    end_date: "",
    event_type: "CONFERENCE",
    user_status: "-",
    location: "EXACTAS - Ciudad Universitaria"
  },
];
