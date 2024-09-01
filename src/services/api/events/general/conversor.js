export function convertEventData(data) {
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
