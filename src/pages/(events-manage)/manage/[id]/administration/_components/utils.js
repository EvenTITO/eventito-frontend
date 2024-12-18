import { CREATED_STATUS, WAITING_APPROVAL_STATUS } from '@/lib/Constants'

function getDate(eventInfo, dateName) {
  const date = eventInfo.dates.filter((d) => d.name === dateName)[0]?.date
  if (date) {
    return new Date(date)
  }
  return null
}

export function getEventStatus(eventInfo) {
  if (eventInfo.status === WAITING_APPROVAL_STATUS) {
    return 'En espera de aprobación'
  } else if (eventInfo.status === CREATED_STATUS) {
    return 'Evento no público'
  }

  const startDate = getDate(eventInfo, 'START_DATE')
  const endDate = getDate(eventInfo, 'END_DATE')
  if (!startDate || !endDate) {
    return 'No publicado'
  }

  if (new Date() < startDate) {
    return 'En período de inscripción'
  } else if (new Date() >= startDate && new Date() <= endDate) {
    return 'En progreso'
  }

  return 'Finalizado'
}

export function getWorksStatus(eventInfo) {
  if (eventInfo.status === WAITING_APPROVAL_STATUS) {
    return 'En espera de aprobación'
  } else if (eventInfo.status === CREATED_STATUS) {
    return 'Evento no público'
  }

  const submissionLimit = getDate(eventInfo, 'SUBMISSION_DEADLINE_DATE')
  if (new Date() < submissionLimit) {
    return 'Abierta'
  }

  return 'Cerrada'
}

export function getDates(eventInfo) {
  const startDate = getDate(eventInfo, 'START_DATE')
  const endDate = getDate(eventInfo, 'END_DATE')
  const submissionLimit = getDate(eventInfo, 'SUBMISSION_DEADLINE_DATE')

  return [startDate, endDate, submissionLimit]
}
