export function constructCreateEventBody(eventData) {
  const { event_type, title, organized_by, short_description } = eventData

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
      },
      {
        name: 'END_DATE',
        label: 'Fecha de Finalización',
        description: 'Fecha de finalización del evento.',
        is_mandatory: true,
      },
      {
        name: 'SUBMISSION_DEADLINE_DATE',
        label: 'Fecha de envío de trabajos',
        description: 'Fecha límite de envío de trabajos.',
        is_mandatory: true,
      },
    ],
    location: '',
    contact: '',
    organized_by: organized_by ? organized_by : '',
    title: title,
    description: short_description,
    event_type: event_type.toUpperCase(),
  }
}
