import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addEventOptional } from "@/state/events/createEventSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SubmitButton({ startDate, endDate, location }) {
  const navigate = useNavigate();
  const { event_type, title, description, organized_by } = useSelector(
    (state) => state.createEvent,
  );
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleSubmit() {
    dispatch(
      addEventOptional({
        startDate: startDate,
        endDate: endDate,
        location: location,
      }),
    );

    // fetch backend
    const fetcherror = false;
    if (fetcherror) {
      toast({
        variant: "destructiveOutline",
        title: "Error al crear el evento",
        description: "El titulo se encuentra repetido",
      });
    } else {
      navigate("/home/my-events");
    }
  }

  return (
    <Button type="button" onClick={handleSubmit}>
      Crear evento
    </Button>
  );
}
