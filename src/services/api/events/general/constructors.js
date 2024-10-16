import { format } from 'date-fns'

export function constructCreateEventBody(eventData) {
  const {
    event_type,
    title,
    location,
    organized_by,
    description,
    startDate,
    endDate,
  } = eventData

  return {
    review_skeleton: {
      questions: [],
    },
    pricing: [],
    tracks: [],
    dates: [
      {
        name: 'START_DATE',
        label: 'Fecha de Comienzo',
        description: 'Fecha de comienzo del evento.',
        is_mandatory: true,
        date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      },
      {
        name: 'END_DATE',
        label: 'Fecha de Finalización',
        description: 'Fecha de finalización del evento.',
        is_mandatory: true,
        date: endDate ? format(endDate, 'yyyy-MM-dd') : undefined,
      },
      {
        name: 'SUBMISSION_DEADLINE_DATE',
        label: 'Fecha de envío de trabajos',
        description: 'Fecha límite de envío de trabajos.',
        is_mandatory: true,
      },
    ],
    location: location ? location : '',
    contact: '',
    organized_by: organized_by ? organized_by : '',
    title: title,
    description: description,
    event_type: event_type.toUpperCase(),
  }
}
