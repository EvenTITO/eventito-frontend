import { format } from 'date-fns'

export function convertEventsData(data) {
  return data.map(convertEventItem)
}

function convertDate(eventData, typeDate) {
  return eventData.dates.find((date) => date.name === typeDate)?.date || null
}

export function convertStartDate(eventData) {
  return convertDate(eventData, 'START_DATE')
}

export function convertEndDate(eventData) {
  return convertDate(eventData, 'END_DATE')
}

function getShortDescription(event) {
  let shortDescription = 'Sin descripcion'
  if (event.mdata?.short_description) {
    shortDescription = event.mdata?.short_description
  } else if (event.description && event.description.length > 0) {
    shortDescription = event.description
  }

  return shortDescription
}

function convertEventItem(data) {
  const startDate = convertStartDate(data)
  const endDate = convertEndDate(data)

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    startDate: startDate,
    endDate: endDate,
    location: data.location,
    shortDescription: getShortDescription(event),
    logoURL: data.media?.filter((m) => m.name === 'main_image')[0].url || null,
    //bannerURL: data.media?.filter((m) => m.name === 'banner_image')[0].url || null,
    bannerURL:
      'https://cms.fi.uba.ar/uploads/Imagenes_Paginas_Internas_Genericas_Cian_Institucional_d1a7c69a52.png',
  }
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
    shortDescription: getShortDescription(event),
    logoURL: data.media?.filter((m) => m.name === 'main_image')[0].url || null,
    //bannerURL: data.media?.filter((m) => m.name === 'banner_image')[0].url || null,
    bannerURL: 'https://www.fi.uba.ar/images/boletin-cover-new.png',
  }))
}

export function convertReviewSkeleton(newQuestions) {
  return {
    review_skeleton: {
      questions: newQuestions,
    },
  }
}

export function convertUpdatePricing(actualPricing, newFare) {
  const newPricing = actualPricing.map((fare) => {
    if (fare.name === newFare.name) {
      return {
        name: newFare.name ? newFare.name : fare.name,
        description: newFare.description
          ? newFare.description
          : fare.description,
        value: newFare.value ? newFare.value : fare.value,
        need_verification: newFare.needVerification
          ? newFare.needVerification
          : fare.need_verification,
        roles: newFare.roles ? newFare.roles : fare.roles,
        currency: newFare.currency ? newFare.currency : fare.currency,
        related_date: newFare.related_date
          ? newFare.related_date.name
          : fare.related_date,
      }
    }
    return fare
  })
  return { pricing: newPricing }
}

export function convertNewPricing(actualPricing, newFare) {
  const updateFare = {
    name: newFare.name,
    description: newFare.description,
    value: newFare.value,
    need_verification: newFare.need_verification,
    roles: newFare.roles,
    related_date: newFare.related_date?.name || null,
    currency: 'ARS',
  }
  return { pricing: [...actualPricing, updateFare] }
}

export function convertNewDates(actualDates, newDate) {
  const updateDate = {
    name: newDate.name,
    label: newDate.label,
    description: newDate.description,
    is_mandatory: false,
    date: format(newDate.date, 'yyyy-MM-dd'),
    time: format(newDate.date, 'HH:mm:ss'),
  }
  return { dates: [...actualDates, updateDate] }
}

export function convertUpdateDates(actualDates, newDate) {
  const updatedDates = actualDates.map((actualDate) => {
    if (actualDate.name === newDate.name) {
      return {
        name: newDate.name ? newDate.name : actualDate.name,
        description: newDate.description
          ? newDate.description
          : actualDate.description,
        label: newDate.label ? newDate.label : actualDate.label,
        is_mandatory: newDate.is_mandatory
          ? newDate.is_mandatory
          : actualDate.is_mandatory,
        date: newDate.date ? newDate.date : actualDate.date,
        time: newDate.time ? newDate.time : actualDate.currency,
      }
    }
    return actualDate
  })
  return { dates: updatedDates }
}

function convertFare(fare) {
  return {
    name: fare.name,
    description: fare.description,
    value: fare.value,
    need_verification: fare.need_verification,
    roles: fare.roles,
    related_date: fare.related_date,
    currency: 'ARS',
  }
}

export function convertFares(fares) {
  return {
    pricing: fares.map((f) => convertFare(f)),
  }
}
