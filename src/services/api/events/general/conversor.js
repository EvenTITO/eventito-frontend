export function convertEventData(data) {
  return data.map(convertEventItem);
}

function convertEventItem(data) {
  const startDate =
    data.dates.find((date) => date.name === "START_DATE")?.date || null;
  const endDate =
    data.dates.find((date) => date.name === "END_DATE")?.date || null;

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    startDate: startDate,
    endDate: endDate,
    location: data.location,
  };
}

export function convertMyEventsData(data) {
  return data.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    event_type: event.event_type,
    location: event.location,
    dates: event.dates.map((date) => ({
      date: date.date,
      description: date.description,
      is_mandatory: date.is_mandatory,
      label: date.label,
      name: date.name,
      time: date.time,
    })),
    roles: event.roles,
    status: event.status,
    tracks: event.tracks,
  }));
}
