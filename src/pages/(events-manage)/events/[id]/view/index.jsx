import { getEvent } from "@/services/api/events/general/hooks";
import Page from "./page";
import FetchStatus from "@/components/FetchStatus";

export default function EventViewPage() {
  const { isPending, error, data: eventInfo } = getEvent("f2c9f5d2-3941-491e-93fc-8de65163c1d2");

  const pageComponent = <Page eventInfo={eventInfo} />
  return (
    <FetchStatus isPending={isPending} error={error} component={pageComponent} />
  );
}

const event = {
  id: "5e7c9063-df75-49ee-8e6c-cd86cc532fce",
  title: "Pycon 2024",
  description: `PyCon 2024 Argentina es la conferencia más esperada para la comunidad de Python en América Latina. Este evento reúne a desarrolladores, profesionales de tecnología, investigadores, estudiantes y entusiastas del software libre para compartir conocimientos, aprender nuevas tecnologías y conectarse con personas apasionadas por Python y su ecosistema.


Durante PyCon 2024, los asistentes podrán disfrutar de una amplia variedad de charlas, talleres, paneles y actividades centradas en el lenguaje de programación Python. Desde temas de ciencia de datos, machine learning, desarrollo web, hasta la automatización y las mejores prácticas de software, PyCon Argentina se destaca por su diversidad de contenidos y la calidad de sus ponentes, tanto locales como internacionales.
Además de las sesiones técnicas, el evento fomentará el networking con espacios dedicados a la colaboración, sesiones de preguntas y respuestas, y momentos para compartir ideas innovadoras. También se realizarán actividades sociales para crear conexiones más allá de la tecnología, brindando a los participantes la oportunidad de integrarse en la comunidad Python.


Este año, PyCon 2024 Argentina se llevará a cabo en la vibrante ciudad de Buenos Aires, conocida por su rica cultura, gastronomía y hospitalidad. Si eres un desarrollador experimentado o alguien que recién está comenzando en el mundo de la programación, PyCon 2024 es el lugar ideal para expandir tus horizontes, aprender nuevas habilidades y ser parte de una comunidad global de apasionados por Python. ¡No te pierdas esta oportunidad única de sumergirte en el mundo Python en Argentina!"`,
  event_type: "CONFERENCE",
  location: "FIUBA, Av. Paseo Colon 850",
  contact: "informatica@fi.uba.ar",
  organized_by: "Depto. de Informática @FIUBA",
  dates: [
    {
      name: "START_DATE",
      label: "Fecha de Comienzo",
      description: "Fecha de comienzo del evento.",
      is_mandatory: true,
      date: "09/10/2024",
      time: "10:00 hs",
    },
    {
      name: "END_DATE",
      label: "Fecha de Finalización",
      description: "Fecha de comienzo del evento.",
      is_mandatory: true,
      date: "12/10/2024",
      time: "12:00 hs",
    },
    {
      name: "SUBMISSION_DEADLINE_DATE",
      label: "Fecha de envío de trabajos",
      description: "Fecha límite de envío de trabajos.",
      is_mandatory: true,
      date: "10/09/2024",
      time: null,
    },
  ],
  roles: ["ORGANIZER"],
  status: "CREATED",
  tracks: ["track1", "track2", "track3", "track4", "track5", "track6"],
  pricing: [
    {
      name: "Asistentes. 50% descuento",
      description: "Tarifa con descuento hasta el 12/09",
      value: 3000,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Asistentes",
      description: "Tarifa para asistentes a partir del 12/09",
      value: 6000,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Alumnos asistentes",
      description: "Tarifa para alumnos de FIUBA",
      value: 2500,
      currency: "ARS",
      need_verification: true,
    },
    {
      name: "Tarifa para oradores",
      description: "Hasta 5 trabajos con un pago",
      value: 6000,
      currency: "ARS",
      need_verification: true,
    },
  ],
  review_skeleton: { questions: [] },
  media: [
    {
      name: "main_image",
      url: "https://cdn.uniacco.com/blog/wp-content/uploads/2021/06/02122118/samuel-pereira-uf2nnANWa8Q-unsplash-min-scaled.jpg",
    },
    {
      name: "brochure",
      url: "https://storage.googleapis.com/eventito-static_event_content/5e7c9063-df75-49ee-8e6c-cd86cc532fce/brochure",
    },
    {
      name: "banner_image",
      url: "https://2023.pycon.co/static/img/general_resources/logo_main.png",
    },
  ],
};
