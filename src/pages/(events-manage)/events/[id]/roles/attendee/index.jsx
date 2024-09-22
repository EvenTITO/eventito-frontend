import {
  useGetPayments,
  useGetRegisterData,
} from "@/hooks/events/attendeeHooks";
import Page from "./page";
import { useSelector } from "react-redux";
import FetchStatus from "@/components/FetchStatus";

export default function AttendeePage() {
  const { currentUser } = useSelector((state) => state.user);
  const register = useGetRegisterData(currentUser.id);
  const payments = useGetPayments(currentUser.id);

  const component = (
    <Page registerData={register.data} payments={payments.data} />
  );

  return (
    <FetchStatus
      component={component}
      isPending={register.isPending || payments.isPending}
      error={register.error || payments.error}
    />
  );
}
