import Page from './page'

export default function AdminEventsPage() {
  return <Page events={sampleEvents} />
}

export const sampleEvents = [
  {
    status: 'WAITING_APPROVAL',
    review_skeleton: {
      questions: [],
      recommendation: {
        more_than_one_answer_allowed: false,
        options: ['Aprobado', 'Desaprobado', 'A revisar'],
        question: 'Recomendación',
        type_question: 'multiple_choice',
      },
    },
    pricing: [
      {
        name: 'Early Bird',
        description: 'Descuento por inscripción temprana',
        value: 500,
        currency: 'ARS',
        roles: ['ORGANIZER'],
        related_date: 'START_DATE',
        need_verification: true,
      },
    ],
    tracks: ['Química Orgánica', 'Química Inorgánica', 'Bioquímica'],
    dates: [
      {
        name: 'START_DATE',
        label: 'Fecha de Comienzo',
        description: 'Fecha de comienzo del evento.',
        is_mandatory: true,
        date: '2024-10-01',
        time: '09:00:00',
      },
      {
        name: 'END_DATE',
        label: 'Fecha de Finalización',
        description: 'Fecha de finalización del evento.',
        is_mandatory: true,
        date: '2024-10-03',
        time: '18:00:00',
      },
      {
        name: 'SUBMISSION_DEADLINE_DATE',
        label: 'Fecha de envío de trabajos',
        description: 'Fecha límite de envío de trabajos.',
        is_mandatory: true,
        date: '2024-08-15',
        time: '23:59:59',
      },
    ],
    location: 'FIUBA, Av. Paseo Colon 850',
    contact: 'Pepe',
    organized_by: 'Pepe Argento',
    mdata: {
      info: 'info_extra',
    },
    title: 'CONGRESO DE QUIMICA',
    description: 'Evento en FIUBA',
    event_type: 'CONFERENCE',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    creator: {
      id: 'uh3jEuh3jEuh3jEuh3jEuh3jEuh3',
      email: 'jose.perez@email.com',
      fullname: 'José Pérez',
    },
    media: [
      {
        name: 'main_image',
        url: 'https://example.com/chemistry-conference.png',
      },
    ],
  },
  {
    status: 'WAITING_APPROVAL',
    review_skeleton: {
      questions: [],
      recommendation: {
        more_than_one_answer_allowed: false,
        options: ['Aprobado', 'Desaprobado', 'A revisar'],
        question: 'Recomendación',
        type_question: 'multiple_choice',
      },
    },
    pricing: [
      {
        name: 'Standard',
        description: 'Precio estándar',
        value: 1000,
        currency: 'ARS',
        roles: ['ORGANIZER'],
        related_date: 'START_DATE',
        need_verification: true,
      },
    ],
    tracks: ['Frontend', 'Backend', 'DevOps'],
    dates: [
      {
        name: 'START_DATE',
        label: 'Fecha de Comienzo',
        description: 'Fecha de comienzo del evento.',
        is_mandatory: true,
        date: '2024-11-15',
        time: '10:00:00',
      },
      {
        name: 'END_DATE',
        label: 'Fecha de Finalización',
        description: 'Fecha de finalización del evento.',
        is_mandatory: true,
        date: '2024-11-16',
        time: '18:00:00',
      },
      {
        name: 'SUBMISSION_DEADLINE_DATE',
        label: 'Fecha de envío de propuestas',
        description: 'Fecha límite de envío de propuestas.',
        is_mandatory: true,
        date: '2024-09-30',
        time: '23:59:59',
      },
    ],
    location: 'Centro de Convenciones, Av. Corrientes 1234',
    contact: 'Maria',
    organized_by: 'TechCo Argentina',
    mdata: {
      info: 'info_adicional',
    },
    title: 'WORKSHOP DE DESARROLLO WEB',
    description: 'Workshop intensivo de desarrollo web moderno',
    event_type: 'WORKSHOP',
    id: '4gb96g75-6828-5673-c4gd-3d074g77bgb7',
    creator: {
      id: 'vi4kFvi4kFvi4kFvi4kFvi4kFvi4',
      email: 'maria.gomez@email.com',
      fullname: 'María Gómez',
    },
    media: [
      {
        name: 'main_image',
        url: 'https://example.com/web-dev-workshop.png',
      },
    ],
  },
]
