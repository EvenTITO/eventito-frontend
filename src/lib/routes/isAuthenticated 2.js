import { useSelector } from "react-redux";

export function isAuthenticated() {
  const {currentUser} = useSelector((state) => state.user);

  return currentUser !== null;
}
