import { useSelector } from "react-redux";

export function userAuthenticated() {
  const {currentUser} = useSelector((state) => state.user);

  return currentUser != null;
}
