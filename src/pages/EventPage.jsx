import "@/features/events/styles/EventPage.css";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addHeader} from "@/services/state/events/eventSlice"
import {useDispatch} from "react-redux";
import EventHeader from "@/features/events/components/EventHeader";
import EventImage from "@/features/events/components/EventImage";
import EventContent from "@/features/events/components/EventContent";

import { apiGetEventPublicById} from "@/services/api/eventServices.js";

export default function EventPage() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        refreshData().then(r => console.log("Event loaded"));
    }, [id]);

    useEffect(() => {
        if (event) {
            dispatch(addHeader([{link: '/', name: 'Eventos'}, {link: `/events/${id}`, name: event?.title}]));
        }
    }, [event]);

    const refreshData = async () => {
        const event = await apiGetEventPublicById(id);
        setEvent(event);
    };

    if (!event) {
        return (
            <div>
                wait
            </div>
        );
    }

    return (
        <>
            <EventHeader event={event}/>
            <EventImage event={event} refreshData={refreshData}/>
            <div className="w-full h-full border-t-2 border-slate-200 px-10 bg-white">
                <div className="w-full h-full py-6 px-10" style={{backgroundColor: 'rgba(255, 255, 255, 0.7)',}}>
                    <EventContent event={event} refreshData={refreshData}/>
                </div>
            </div>
        </>
    );
}
