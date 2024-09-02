import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSelector } from "react-redux";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function hasRole(role) {
  const { roles } = useSelector((state) => state.event);

  return roles.includes(role);
}

export function hasAnyRole() {
  const { roles } = useSelector((state) => state.event);

  return roles.length > 0;
}
