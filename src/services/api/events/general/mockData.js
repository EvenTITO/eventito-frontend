import { convertEventData } from "./conversor";

const originalData = [
  {
    status: "CREATED",
    review_skeleton: { questions: [] },
    pricing: [
      {
        name: "string",
        description: "string",
        value: 0,
        currency: "ARS",
        need_verification: true,
      },
    ],
    tracks: ["track1", "track2", "track3"],
    dates: [
      {
        name: "START_DATE",
        label: "Fecha de Comienzo",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        date: "2023-09-15",
        time: null,
      },
      {
        name: "END_DATE",
        label: "Fecha de Finalización",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        date: "2023-09-16",
        time: null,
      },
      {
        name: "SUBMISSION_DEADLINE_DATE",
        label: "Fecha de envío de trabajos",
        description: "Fecha límite de envío de trabajos.",
        is_mandatory: true,
        date: null,
        time: null,
      },
    ],
    location: "FIUBA - Paseo Colon",
    contact: "Pepe",
    organized_by: "Pepe Argento",
    title: "JIAFES 2024",
    description:
      "Conferencia de quimica organizada por el departamento de quimica de la fiuba",
    event_type: "CONFERENCE",
    id: "f2c9f5d2-3941-491e-93fc-8de65163c1d2",
    media: [
      {
        name: "main_image",
        url: "https://storage.googleapis.com/eventito-static_event_content/f2c9f5d2-3941-491e-93fc-8de65163c1d2/main_image",
      },
      {
        name: "brochure",
        url: "https://storage.googleapis.com/eventito-static_event_content/f2c9f5d2-3941-491e-93fc-8de65163c1d2/brochure",
      },
      {
        name: "banner_image",
        url: "https://storage.googleapis.com/eventito-static_event_content/f2c9f5d2-3941-491e-93fc-8de65163c1d2/banner_image",
      },
    ],
  },
  {
    status: "PUBLISHED",
    review_skeleton: { questions: [] },
    pricing: [
      {
        name: "VIP Pass",
        description: "Access to all areas and events",
        value: 100,
        currency: "USD",
        need_verification: false,
      },
    ],
    tracks: ["trackA", "trackB"],
    dates: [
      {
        name: "START_DATE",
        label: "Fecha de Comienzo",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        date: "2023-10-01",
        time: null,
      },
      {
        name: "END_DATE",
        label: "Fecha de Finalización",
        description: "Fecha de finalización del evento.",
        is_mandatory: true,
        date: "2023-10-03",
        time: null,
      },
    ],
    location: "Central Park, New York",
    contact: "John Doe",
    organized_by: "John Doe Organization",
    title: "Music Festival",
    description:
      "A 3-day outdoor music festival featuring popular bands and artists.",
    event_type: "FESTIVAL",
    id: "a1b2c3d4-5678-9101-1121-314151617181",
    media: [
      {
        name: "poster_image",
        url: "https://example.com/music_festival/poster_image",
      },
      {
        name: "schedule",
        url: "https://example.com/music_festival/schedule",
      },
    ],
  },
  {
    status: "DRAFT",
    review_skeleton: { questions: [] },
    pricing: [
      {
        name: "General Admission",
        description: "Basic access to all talks and workshops",
        value: 50,
        currency: "EUR",
        need_verification: false,
      },
    ],
    tracks: ["Tech", "Health"],
    dates: [
      {
        name: "START_DATE",
        label: "Fecha de Comienzo",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        date: "2023-11-20",
        time: null,
      },
      {
        name: "END_DATE",
        label: "Fecha de Finalización",
        description: "Fecha de finalización del evento.",
        is_mandatory: true,
        date: "2023-11-21",
        time: null,
      },
    ],
    location: "Berlin Convention Center, Germany",
    contact: "Anna Schmidt",
    organized_by: "TechHealth Inc.",
    title: "Tech and Health Expo",
    description: "An expo showcasing the latest in technology and healthcare.",
    event_type: "EXPO",
    id: "e5f6g7h8-9101-1121-3141-516171819202",
    media: [
      {
        name: "flyer",
        url: "https://example.com/tech_health_expo/flyer",
      },
      {
        name: "map",
        url: "https://example.com/tech_health_expo/map",
      },
    ],
  },
  {
    status: "CANCELLED",
    review_skeleton: { questions: [] },
    pricing: [
      {
        name: "Early Bird",
        description: "Discounted ticket for early registrants",
        value: 30,
        currency: "GBP",
        need_verification: false,
      },
    ],
    tracks: ["trackX"],
    dates: [
      {
        name: "START_DATE",
        label: "Fecha de Comienzo",
        description: "Fecha de comienzo del evento.",
        is_mandatory: true,
        date: "2023-12-01",
        time: null,
      },
      {
        name: "END_DATE",
        label: "Fecha de Finalización",
        description: "Fecha de finalización del evento.",
        is_mandatory: true,
        date: "2023-12-02",
        time: null,
      },
    ],
    location: "London Exhibition Centre, UK",
    contact: "Sarah Collins",
    organized_by: "EventX",
    title: "Winter Gala",
    description:
      "A gala event with dinner, performances, and a charity auction.",
    event_type: "GALA",
    id: "i9j0k1l2-3456-7890-1234-567891011121",
    media: [
      {
        name: "invitation_image",
        url: "https://example.com/winter_gala/invitation_image",
      },
      {
        name: "menu",
        url: "https://example.com/winter_gala/menu",
      },
    ],
  },
];

export const eventData = originalData.map(convertEventData);
