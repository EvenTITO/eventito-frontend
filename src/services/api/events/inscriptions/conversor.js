export function convertInscriptions(inscriptions) {
  return inscriptions === undefined || inscriptions.length === 0 ? undefined: convertInscription(inscriptions[0]);
}

function convertInscription(inscription) {
  return {
    id: inscription.id,
    roles: inscription.roles,
    affiliation: inscription.affiliation
  }
}
