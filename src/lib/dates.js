function getDate(nameDate, eventData) {
  return eventData?.dates.filter((date) => date.name === nameDate)[0]
}

export function getStartDate(eventData) {
  return getDate('START_DATE', eventData)
}

export function getDeadlineSubmissions(eventData) {
  return getDate('SUBMISSION_DEADLINE_DATE', eventData)
}

export function dateIsValid(minDate = null, maxDate = null) {
  let valid = true
  const now = new Date()

  if (minDate) {
    if (now < minDate) {
      valid = false
    }
  }

  if (maxDate) {
    if (now > maxDate) {
      valid = false
    }
  }
  return valid
}

export function timeIsUp(date = null, time = null){
  if( !date ){
    return false
  }
  const _time = time ? time: "00:00:00"
  const _date = date
  const datetime = new Date(`${_date}T${_time}`);
  const now = new Date()

  return datetime < now
}
