export function convertInscriptions(inscriptions, payments) {
  return inscriptions === undefined || inscriptions.length === 0 ? undefined: convertInscription(inscriptions[0], payments);
}

function convertInscription(inscription, payments) {
  return {
    id: inscription.id,
    roles: inscription.roles,
    affiliation: inscription.affiliation,
    payments: payments === undefined ? [] : convertPayments(payments)
  }
}

export function convertPayments(payments) {
  return payments === undefined || payments.length === 0
    ? undefined
    : payments.map(convertPayment);
}

function convertPayment(payment) {
  return {
    id: payment.id,
    name: payment.fare_name,
    status: payment.status,
    works: payment.works,
  }
}
