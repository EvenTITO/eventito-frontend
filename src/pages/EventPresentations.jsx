import EventHeader from "@/features/events/components/EventHeader";
import {useLocation} from "react-router-dom";

export default function EventPresentations() {
    const location = useLocation();
    return (
    <div>
        <EventHeader event={location.state.event}/>
      <div>
        Mis trabajos
      </div>
    </div>
  );
}
