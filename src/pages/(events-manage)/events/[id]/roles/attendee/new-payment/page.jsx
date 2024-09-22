import { useNavigator } from "@/lib/navigation";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/state/events/newPaymentSlice";
import { useNewPayment } from "@/hooks/events/attendeeHooks";
import FormSelectPayment from "./form/FormSelectPayment";
import FormSubmitPayment from "./form/FormSubmitFile";
import SteppedForm from "@/components/SteppedForm";

export default function NewPaymentPage() {
  const navigator = useNavigator("/new-payment");
  const dispatch = useDispatch();
  const { mutateAsync: newPayment, isPending, error } = useNewPayment();
  const { pricing, pdfFile } = useSelector((state) => state.newPayment);
  const { currentUser } = useSelector((state) => state.user);
  const booleanForSteps = [pricing, pdfFile];
  const stepsComponents = [<FormSelectPayment />, <FormSubmitPayment />];

  async function onSave() {
    await newPayment({
      userId: currentUser.id,
      paymentData: { pricing, pdfFile },
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
