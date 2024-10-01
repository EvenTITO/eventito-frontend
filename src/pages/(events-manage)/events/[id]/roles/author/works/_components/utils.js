import { dateIsValid } from '@/lib/dates'

export function onWorkEditDay(workData) {
  const deadlineDate = new Date(workData?.deadlineDate)
  return dateIsValid(null, deadlineDate)
}
