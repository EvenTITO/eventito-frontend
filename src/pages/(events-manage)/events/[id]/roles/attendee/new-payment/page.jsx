import {useNavigator} from "@/lib/navigation";
import {useDispatch, useSelector} from "react-redux";
import {reset} from "@/state/events/newPaymentSlice";
import {useNewPayment} from "@/hooks/events/attendeeHooks";
import FormSelectPayment from "./form/FormSelectPayment";
import FormSubmitPayment from "./form/FormSubmitFile";
import SteppedForm from "@/components/SteppedForm";

export default function Page({eventData, inscriptionId}) {
  const navigator = useNavigator("/new-payment");
  const dispatch = useDispatch();
  const {mutateAsync: newPayment, isPending, error} = useNewPayment();
  const {pricing, pdfFile} = useSelector((state) => state.newPayment);
  const booleanForSteps = [pricing, pdfFile];
  const stepsComponents = [<FormSelectPayment eventPricing={eventData.pricing}/>, <FormSubmitPayment/>];

  async function onSave() {
    await newPayment({
      inscriptionId: inscriptionId,
      paymentData: {fare_name: pricing, file: pdfFile, works:[]},
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
