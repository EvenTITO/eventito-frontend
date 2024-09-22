import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function hasRole(role) {
  const { roles } = useSelector((state) => state.event);

  return roles.includes(role);
}

export function hasAnyRole() {
  const { roles } = useSelector((state) => state.event);

  return roles.length > 0;
}

export function getEventId() {
  const { id: eventId } = useParams();

  return eventId;
}

export function getWorkId() {
  const { workId } = useParams();

  return workId;
}
