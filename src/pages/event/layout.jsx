import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function LayoutEvent() {
  const { serverError } = useSelector((state) => state.app);

  if (!serverError) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <div>PANIC!!!!!</div>;
  }
}
