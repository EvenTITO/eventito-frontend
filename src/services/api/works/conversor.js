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
    deadlineDate: work.deadline_date,
    track: work.track,
    authors: work.authors,
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
    email: review.reviewer.email,
    completed: true,
    creationDate: review.creation_date,
    status: review.status,
    submissionId: review.submission_id,
    reviewerId: review.reviewer_id,
    reviewForm: review.review.answers,
    reviewId: review.id
  }
}

export function convertReviewers(reviewers) {
  return reviewers.map(convertReviewer)
}

function convertReviewer(reviewer) {
  return {
    id: reviewer.user_id,
    reviewer: reviewer.user.name + " " + reviewer.user.lastname,
    email: reviewer.user.email,
    deadline: reviewer.works[0].review_deadline
  }
}

function convertMyWork(myWork) {
  return {
    id: myWork.id,
    title: myWork.title,
    authors: myWork.authors,
    status: myWork.state,
    track: myWork.track,
    abstract: myWork.abstract
  }
}

export function convertMyWorks(myWorks) {
  return myWorks.map(convertMyWork)
}
