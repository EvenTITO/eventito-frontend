export const USERS_URL = 'https://gateway-pv5n.onrender.com/api/v1/users'
export const EVENTS_URL = 'https://gateway-pv5n.onrender.com/api/v1/events'
export const HOME_PATH = '/'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/sing-up'
export const FORGOT_PASSWORD_PATH = '/forgot-password'
export const PRIVATE_POLICY_PATH = '/private-policy'
export const TERMS_CONDITIONS_PATH = '/terms-and-conditions'

export const ADMIN_EVENTITO_ROLE = 'ADMIN'
export const EVENT_CREATOR_EVENTITO_ROLE = 'EVENT_CREATOR'
export const DEFAULT_EVENTITO_ROLE = 'DEFAULT'

export const ORGANIZER_ROLE = 'ORGANIZER'
export const CHAIR_ROLE = 'CHAIR'
export const REVIEWER_ROLE = 'REVIEWER'
export const SPEAKER_ROLE = 'SPEAKER'
export const ATTENDEE_ROLE = 'ATTENDEE'

// Roles ordered from the highest permissions to lowest.
export const RoleImportance = {
  [ORGANIZER_ROLE]: 1,
  [CHAIR_ROLE]: 2,
  [REVIEWER_ROLE]: 3,
  [SPEAKER_ROLE]: 4,
  [ATTENDEE_ROLE]: 5,
}

export const EVENT_ROLES_LABELS = {
  ORGANIZER: 'Organizador',
  CHAIR: 'Chair',
  REVIEWER: 'Revisor',
  SPEAKER: 'Autor',
  ATTENDEE: 'Asistente',
}

export const EVENT_STATUS_LABELS = {
  STARTED: 'En progreso',
  CREATED: 'Creado',
  WAITING_APPROVAL: 'Pendiente de aprobación',
}

export const STARTED_STATUS = 'STARTED'
export const CREATED_STATUS = 'CREATED'
export const WAITING_APPROVAL_STATUS = 'WAITING_APPROVAL'

export const WORKS_STATUS_PUBLISH = {
  APPROVED: 'Aceptado',
  RE_SUBMIT: 'En revisión',
  REJECTED: 'Rechazado',
}

export const WORKS_STATUS_LABELS = {
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
  RE_SUBMIT: 'Debe reentregar',
  SUBMITTED: 'Entregado',
}

export const REGISTRATION_ROLES = [
  {
    id: ATTENDEE_ROLE,
    title: EVENT_ROLES_LABELS[ATTENDEE_ROLE],
    description: 'Asistir al evento',
  },
  {
    id: SPEAKER_ROLE,
    title: EVENT_ROLES_LABELS[SPEAKER_ROLE],
    description: 'Presentar trabajos en el evento',
  },
  {
    id: 'ATTENDEE,SPEAKER',
    title: 'Asistente y autor',
    description: 'Asistir y presentar trabajos',
  },
]

export const REVIEW_STATUS_LABELS = {
  APPROVED: 'Aprobado',
  NOT_APPROVED: 'Desaprobado',
  RE_SUBMIT: 'A revisar',
}

export const REVIEW_STATUS_LABELS_REVERSE = {
  Aprobado: 'APPROVED',
  Desaprobado: 'NOT_APPROVED',
  'A revisar': 'RE_SUBMIT',
}

export const INSCRIPTION_ROLES_LABELS = {
  SPEAKER: 'Autor',
  ATTENDEE: 'Asistente',
}

export const INSCRIPTION_ROLES_LABELS_REVERSE = {
  Autor: SPEAKER_ROLE,
  Asistente: ATTENDEE_ROLE,
}

export const PAYMENT_STATUS_LABELS = {
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
  UNCOMPLETED: 'Insuficiente',
  PENDING_APPROVAL: 'Pendiente de revisión',
}
