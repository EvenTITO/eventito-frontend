export function convertInscriptions(inscriptions, payments = []) {
  return inscriptions.map((i) =>
    convertInscription(
      i,
      payments.filter((p) => p.inscription_id === i.id)
    )
  )
}

export function convertInscription(inscription, payments = []) {
  return inscription === undefined
    ? undefined
    : {
        id: inscription.id,
        roles: inscription.roles,
        affiliation: inscription.affiliation,
        userId: inscription.user_id,
        userName: inscription.user.fullname,
        userEmail: inscription.user.email,
        status: inscription.status,
        payments: convertPayments(payments),
      }
}

export function convertPayments(payments) {
  return payments === undefined || payments.length === 0
    ? []
    : payments.map(convertPayment)
}

function convertPayment(payment) {
  return {
    id: payment.id,
    inscriptionId: payment.inscription_id,
    name: payment.fare_name,
    status: payment.status,
    date: payment.creation_date,
    works: payment.works,
  }
}
