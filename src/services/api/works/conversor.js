export function convertWorks(works) {
  return works.map((w) => convertWork(w, undefined));
}


export function convertWork(work, submissions = undefined) {
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
    published: work.state !== "SUBMITTED",
    submissions: submissions,
    lastSubmission: submissions ? submissions.toSorted((a, b) => a.creation_date - b.creation_date)[0] : null,
  }
}


function getMainAuthorFullName(work) {
  let mainAuthor = work.authors.filter(a => a.is_main)[0]
  if (!mainAuthor) {
    console.error("Should have created the work with a main author in the frontend");
    mainAuthor = work.authors[0]
  }
  return mainAuthor.full_name;
}

export function convertReviews(reviews) {
  return reviews.map(convertReview)
}

function convertReview(review) {
  return {
    reviewer: review.reviewer.name + " " + review.reviewer.lastname,
    completed: true,
    creationDate: review.creation_date,
    status: review.status,
    reviewForm: review.review.answers
  }
}
