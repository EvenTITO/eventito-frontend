import { Button } from "@/components/ui/button";
import { addEventOptional } from "@/state/events/createEventSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SubmitButton({ startDate, endDate, location }) {
  const { event_type, title, description, organized_by } = useSelector(
    (state) => state.createEvent,
  );
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(
      addEventOptional({
        startDate: startDate,
        endDate: endDate,
        location: location,
      }),
    );

    console.log(startDate);
  }

  return (
    <Button type="button" onClick={handleSubmit}>
      Crear evento
    </Button>
  );
}
