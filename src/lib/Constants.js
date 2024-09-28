export const USERS_URL = "https://gateway-pv5n.onrender.com/api/v1/users";
export const EVENTS_URL = "https://gateway-pv5n.onrender.com/api/v1/events";
export const HOME_PATH = "/";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/sing-up";
export const FORGOT_PASSWORD_PATH = "/forgot-password";
export const PRIVATE_POLICY_PATH = "/private-policy";
export const TERMS_CONDITIONS_PATH = "/terms-and-conditions";

// ROLES CONSTANTS
export const ORGANIZER_ROLE = "ORGANIZER";
export const CHAIR_ROLE = "CHAIR";
export const REVIEWER_ROLE = "REVIEWER";
export const AUTHOR_ROLE = "AUTHOR";

export const WORKS_STATUS_PUBLISH = {
  "APPROVED": "Aceptado",
  "RE_SUBMIT": "En revisión",
  "REJECTED": "Rechazado"
}

export const WORKS_STATUS_LABELS = {
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
  RE_SUBMIT: "Debe reentregar",
  SUBMITTED: "Entregado",
};

export const REGISTRATION_ROLES = [
  {
    id: "ATTENDEE",
    title: "Asistente",
    description: "Asistir al evento para escuchar charlas",
  },
  {
    id: "SPEAKER",
    title: "Autor",
    description: "Presentar uno o más trabajos en el evento",
  },
  {
    id: "ATTENDEE,SPEAKER",
    title: "Asistente y autor",
    description: "Asistir a charlas y presentar trabajos",
  },
];

export const REVIEW_STATUS_LABELS = {
  "APPROVED": "Aprobado",
  "NOT_APPROVED": "Desaprobado",
  "RE_SUBMIT": "A revisar"
}

export const REVIEW_STATUS_LABELS_REVERSE = {
  "Aprobado": "APPROVED",
  "Desaprobado": "NOT_APPROVED",
  "A revisar": "RE_SUBMIT"
}

export const INSCRIPTION_ROLES_LABELS = {
  "SPEAKER": "Autor",
  "ATTENDEE": "Asistente"
}

export const PAYMENT_STATUS_LABELS = {
  "APPROVED": "Aprobado",
  "REJECTED": "Rechazado",
  "UNCOMPLETED": "Insuficiente",
  "PENDING_APPROVAL": "Pendiente de revisión"
}
