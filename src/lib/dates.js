function getDate(nameDate, eventData) {
  return eventData?.dates.filter((date) => date.name === nameDate)[0];
}

export function getStartDate(eventData) {
  return getDate("START_DATE", eventData);
}

export function getDeadlineSubmissions(eventData) {
  return getDate("SUBMISSION_DEADLINE_DATE", eventData);
}

export function dateIsValid(minDate = null, maxDate = null) {
  // TODO (gsabatino9): terminar de validar esto
  let valid = true;
  const now = new Date();

  if (minDate) {
    if (now < minDate) {
      valid = false;
    }
  }

  if (maxDate) {
    if (now > maxDate) {
      valid = false;
    }
  }

  return valid;
}