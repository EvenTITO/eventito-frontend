import {
  convertStartDate,
  convertEndDate,
} from '../../events/general/conversor'

export function convertEventsWaitingApproval(data) {
  return data.map(convertEventItem)
}

function convertEventItem(event) {
  return {
    id: event.id,
    title: event.title,
    organizer: 'FALTA TRAER ESTA INFO PARA EL ADMIN', // TODO
    location: event.location,
    contact: event.contact,
    organized_by: event.organized_by,
    description: event.description,
    event_type: event.event_type,
    start_date: convertStartDate(event),
    end_date: convertEndDate(event),
    status: event.status,
  }
}
