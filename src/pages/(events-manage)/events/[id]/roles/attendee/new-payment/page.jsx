import { useNavigator } from "@/lib/navigation";
import SteppedForm from "./form/SteppedForm";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "@/state/events/newPaymentSlice";
import { useNewPayment } from "@/hooks/events/attendeeHooks";

export default function NewPaymentPage() {
  const navigator = useNavigator("/new-payment");
  const dispatch = useDispatch();
  const { mutateAsync: newPayment, isPending, error } = useNewPayment();
  const { pricing, pdfFile } = useSelector((state) => state.newPayment);
  const { currentUser } = useSelector((state) => state.user);

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

  return <SteppedForm onSave={onSave} onCancel={onCancel} />;
}
