export function convertInscription(inscription, payments) {
  return inscription === undefined
    ? undefined
    : {
      id: inscription.id,
      roles: inscription.roles,
      affiliation: inscription.affiliation,
      payments: convertPayments(payments)
    }
}

export function convertPayments(payments) {
  return payments === undefined || payments.length === 0
    ? []
    : payments.map(convertPayment);
}

function convertPayment(payment) {
  return {
    id: payment.id,
    name: payment.fare_name,
    status: payment.status,
    date: payment.creation_date,
    works: payment.works,
  }
}
