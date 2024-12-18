import { format } from '@formkit/tempo'
import { parseDate } from '@internationalized/date'

export function getIntermediateDates(startDateStr, endDateStr) {
  const dateArray = []

  let currentDate = parseDate(startDateStr)
  const endDate = parseDate(endDateStr)

  if (endDate.compare(currentDate) < 0) {
    return dateArray
  }

  while (currentDate.compare(endDate) <= 0) {
    dateArray.push(currentDate.toString())
    currentDate = currentDate.add({ days: 1 })
  }

  return dateArray
}

export function getActivitiesForDay(day, activities) {
  const startOfDay = new Date(new Date(day).setHours(0, 0, 0, 0))

  const startOfNextDay = new Date(startOfDay)
  startOfNextDay.setDate(startOfNextDay.getDate() + 1)

  return activities
    .filter((activity) => {
      const activityDate = new Date(activity.date)
      return activityDate >= startOfDay && activityDate < startOfNextDay
    })
    .sort((a, b) => {
      return a.startHour.localeCompare(b.startHour)
    })
}

export function formatDay(day) {
  return format(day, 'full')
}

export function ShowDay(day, numberDay) {
  const formattedDay = formatDay(day)
  return `Agenda día ${numberDay} - ${formattedDay}`
}

export function HourToString(hour) {
  const minute = hour.minute >= 10 ? hour.minute : `0${hour.minute}`
  return `${hour.hour}:${minute}:00`
}
