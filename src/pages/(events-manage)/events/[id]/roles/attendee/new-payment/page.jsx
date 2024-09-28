import { useNavigator } from "@/lib/navigation";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/state/events/newPaymentSlice";
import { useNewPayment } from "@/hooks/events/attendeeHooks";
import FormSelectPayment from "./form/FormSelectPayment";
import FormSubmitPayment from "./form/FormSubmitFile";
import SteppedForm from "@/components/SteppedForm";
import { useEffect } from "react";

export default function Page({ eventData, works }) {
  const navigator = useNavigator("/new-payment");
  const dispatch = useDispatch();
  const { mutateAsync: newPayment, isPending, error } = useNewPayment();
  const { pricing, paymentPDF, affiliationPDF } = useSelector(
    (state) => state.newPayment,
  );
  const booleanForSteps = [pricing, paymentPDF];
  const stepsComponents = [
    <FormSelectPayment eventPricing={eventData.pricing} />,
    <FormSubmitPayment />,
  ];

  useEffect(() => {
    console.log(works);
  }, []);

  async function onSave() {
    await newPayment({
      // como le paso el affiliationPDF
      paymentData: { fare_name: pricing, file: paymentPDF, works: [] },
    });
    dispatch(reset());
    navigator.back();
  }

  function onCancel() {
    dispatch(reset());
    navigator.back();
  }

  return (
    <SteppedForm
      title={"Proceso de pago"}
      onSave={onSave}
      onCancel={onCancel}
      booleanForSteps={booleanForSteps}
      stepsComponents={stepsComponents}
    />
  );
}
