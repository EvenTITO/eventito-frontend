
export function convertWorks(works) {
  return works.map(convertWork);
}


function convertWork(work) {
  return {
    id: work.id,
    title: work.title,
    authorCount: work.authors.length,
    submitter: "TODO: FALTA AGREGARLO",
    maxReviewDate: "TODO: NO SE USA. HAY QUE USAR LA DEADLINE DATE. REVIEWS HAY MUCHOS",
    track: work.track,
    authors: work.authors.map((a) => a.full_name),
    orator: "TODO: ESTO NO VA. NO SABEMOS SI ES UNO O MUCHOS",
    abstract: work.abstract,
    pdfLink: "TODO: ESTO NO VA. SE PIDE CUANDO SE QUIERE DESCARGAR",
    status: work.state,
    published: work.state !== "SUBMITTED"
  }
}
