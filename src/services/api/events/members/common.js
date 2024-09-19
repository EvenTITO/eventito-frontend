export const EventRole = {
  "ORGANIZER": "ORGANIZER",
  "CHAIR": "CHAIR",
  "REVIEWER": "REVIEWER",
  "SPEAKER": "SPEAKER",
  "ATTENDEE": "ATTENDEE"
};

// Roles ordered from the highest permissions to lowest.
export const RoleImportance = {
  [EventRole.ORGANIZER]: 1,
  [EventRole.CHAIR]: 2,
  [EventRole.REVIEWER]: 3,
  [EventRole.SPEAKER]: 4,
  [EventRole.ATTENDEE]: 5
};
