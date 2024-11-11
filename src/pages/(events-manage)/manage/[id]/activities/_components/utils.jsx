import { format, parse } from '@formkit/tempo'

export function getIntermediateDates(startDate, endDate) {
  const dateArray = []

  let currentDate = new Date(new Date(startDate).setHours(0, 0, 0, 0))
  const finalDate = new Date(new Date(endDate).setHours(0, 0, 0, 0))

  while (currentDate <= finalDate) {
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const day = String(currentDate.getDate()).padStart(2, '0')

    dateArray.push(`${year}-${month}-${day}`)
    currentDate.setDate(currentDate.getDate() + 1)
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
