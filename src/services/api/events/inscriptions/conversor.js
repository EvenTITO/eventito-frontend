import {INSCRIPTION_ROLES_LABELS} from "@/lib/Constants.js";

export function convertInscriptions(inscriptions) {
  return inscriptions === undefined || inscriptions.length === 0 ? undefined: convertInscription(inscriptions[0]);
}

function convertInscription(inscription) {
  console.log("inscription back: ", inscription)
  return {
    id: inscription.id,
    roles: inscription.roles.map(role => INSCRIPTION_ROLES_LABELS[role]),
    affiliation: inscription.affiliation
  }
}
