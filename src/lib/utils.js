import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function hasRole(role) {
  const { roles } = useSelector((state) => state.event)

  return roles.includes(role)
}

export function hasAnyRole() {
  const { roles } = useSelector((state) => state.event)

  return roles.length > 0
}

export function getEventId() {
  const { id: eventId } = useParams()

  return eventId
}

export function getInscriptionId() {
  const { inscriptionId } = useParams()

  return inscriptionId
}

export function getWorkId() {
  const { workId } = useParams()

  return workId
}

export async function wait(secs) {
  return new Promise((resolve) => setTimeout(resolve, secs * 1000))
}

export function keyValueToValueLabel(obj) {
  return Object.entries(obj).map(([value, label]) => {
    return { value, label }
  })
}

export function canStartEvent(event) {
  //TODO estas validaciones revisarlas, si se cambian adecuar el mensaje
  // harcodeado del tooltip del page donde se utiliza esta función
  const hasMandatoryDates =
    event.dates.length > 0 &&
    event.dates.every((d) => !d.is_mandatory || (d.date && d.time))
  const hasPricing = event.pricing.length > 0
  const hasTracks = event.tracks.length > 0
  return hasMandatoryDates && hasPricing && hasTracks
}

export function getDateByName(dates, dateName) {
  return dateName
    ? dates?.filter((d) => d.name === dateName)[0] || undefined
    : undefined
}

export function generateRelatedDate(fare, value) {
  return {
    name: 'PAYMENT_DEADLINE_DATE-' + fare.name,
    label: 'Fecha límite de ' + fare.name,
    description: 'Fecha límite de ' + fare.name,
    is_mandatory: false,
    date: value,
    time: '23:59',
  }
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
