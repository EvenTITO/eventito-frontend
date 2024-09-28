import { useNavigator } from "@/lib/navigation";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/state/events/newPaymentSlice";
import { useNewPayment } from "@/hooks/events/attendeeHooks";
import FormSelectPayment from "./form/FormSelectPayment";
import FormSubmitPayment from "./form/FormSubmitFile";
import SteppedForm from "@/components/SteppedForm";
import { useEffect } from "react";
import FormSelectWorks from "./form/FormSelectWorks";

export default function Page({ eventData, works }) {
  const navigator = useNavigator("/new-payment");
  const dispatch = useDispatch();
  const { mutateAsync: newPayment, isPending, error } = useNewPayment();
  const { pricing, paymentPDF, affiliationPDF, worksIds } = useSelector(
    (state) => state.newPayment,
  );
  const booleanForSteps = [pricing, true, paymentPDF];
  const stepsComponents = [
    <FormSelectPayment eventPricing={eventData.pricing} />,
    <FormSelectWorks works={works} />,
    <FormSubmitPayment />,
  ];

  async function onSave() {
    console.log("works ids", worksIds);
    await newPayment({
      paymentData: { fare_name: pricing, file: paymentPDF, works: worksIds },
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
