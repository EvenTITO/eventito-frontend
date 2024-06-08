import "@/features/events/styles/EventPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addHeader } from "@/services/state/events/eventSlice"
import { useDispatch } from "react-redux";
import EventHeader from "@/features/events/components/EventHeader";
import EventImage from "@/features/events/components/EventImage";
import EventContent from "@/features/events/components/EventContent";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setEvent({
        title: 'JIAFES 2024',
        description: 'Esta charla explorará los últimos avances en la química de materiales, enfocándose en el desarrollo de nuevos compuestos con aplicaciones tecnológicas innovadoras. Se discutirán técnicas avanzadas de caracterización y los mecanismos de reactividad que permiten la creación de materiales con propiedades únicas. Además, se analizarán casos de estudio sobre la implementación de estos materiales en la industria y la ciencia.',
        start_date: '08/10/2024',
        end_date: '10/10/2024',
        event_type: 'Conference',
        photo_url: 'https://www.unirioeditora.com.ar/wp-content/uploads/2018/07/9-Congreso-de-qu%C3%ADmica-anal%C3%ADtica.png',
        backgroundImage: "https://agcdn-1d97e.kxcdn.com/wp-content/uploads/2017/02/alphagamma-top-10-business-conferences-for-entrepreneurs-opportunities-1021x580.jpg",
      });
      dispatch(addHeader([{ link: '/', name: 'Eventos' }, { link: '/events/1234', name: 'JIAFES 2024' }]));
    }
  }, [id]);

  if (!event) {
    return (
      <div>
        wait
      </div>
    );
  }

  return (
    <>
      <EventHeader event={event} />
      <EventImage photoUrl={event.backgroundImage} />
      <div className="w-full h-full border-t-2 border-slate-200 px-10 bg-white">
        <div className="w-full h-full py-6 px-10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', }}>
          <EventContent event={event} />
        </div>
      </div>
    </>
  );
}
