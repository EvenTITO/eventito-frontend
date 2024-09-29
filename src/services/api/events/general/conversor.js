import {convertReviewSkeletonQuestions} from "@/services/api/events/reviewer/conversor"

export function convertEventsData(data) {
  return data.map(convertEventItem);
}

function convertDate(eventData, typeDate) {
  return eventData.dates.find((date) => date.name === typeDate)?.date || null;
}

export function convertStartDate(eventData) {
  return convertDate(eventData, "START_DATE");
}

export function convertEndDate(eventData) {
  return convertDate(eventData, "END_DATE");
}

function convertEventItem(data) {
  const startDate = convertStartDate(data);
  const endDate = convertEndDate(data);

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


export function convertEventFullData(data) {
  return {
    ...data,
    review_skeleton: {questions: convertReviewSkeletonQuestions(data.review_skeleton.questions)}
  }
}

export function convertReviewSkeletonQuestions(newQuestions){
  return {
    review_keleton: {
      questions: newQuestions
    }
  }
}
