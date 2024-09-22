
export function convertWorks(works) {
  return works.map(convertWork);
}


export function convertWork(work) {
  return {
    id: work.id,
    title: work.title,
    authorCount: work.authors.length,
    submitter: getMainAuthorFullName(work),
    creationDate: work.creation_date,
    lastUpdate: work.last_update,
    track: work.track,
    authors: work.authors.map((a) => a.full_name),
    abstract: work.abstract,
    status: work.state,
    published: work.state !== "SUBMITTED"
  }
}


function getMainAuthorFullName(work) {
  let mainAuthor = work.authors.filter(a => a.is_main)[0]
  if (!mainAuthor) {
    console.error("Should have created the work with a main author in the frontend");
    mainAuthor =  work.authors[0]
  }
  return mainAuthor.full_name;
}

export function convertReviews(reviews) {
  reviews.map(convertReview)
}

function convertReview(review) {
  return {
    reviewer: "Gonzalo Sabatino",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "Aceptado",
    reviewForm: reviewForm,
  }
}

const reviews = [
  {
    reviewer: "Gonzalo Sabatino",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "Aceptado",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Fernando Sinisi",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "A revisión",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Lucas Verón",
    completed: false,
    deadlineDate: "2024/09/20",
    status: null,
    reviewForm: null,
  },
];
