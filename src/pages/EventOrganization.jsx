import EventHeader from "@/features/events/components/EventHeader";
import {useLocation} from "react-router-dom";

export default function EventOrganization() {
    const location = useLocation();
    return (
    <div>
        <EventHeader event={location.state.event}/>
      <div>
        Organización
      </div>
    </div>
  );
}
