export function getReviewsData(work, reviews) {
  if (work === undefined || reviews === undefined) {
    return
  }
  const sortedSubmissions = work.submissions.toSorted(
    (a, b) => a.creation_date - b.creation_date
  )
  return reviews.map((r) => {
    return {
      ...r,
      submissionNumber: sortedSubmissions.findIndex(
        (s) => s.id === r.submissionId
      ),
    }
  })
}

export function getReviewersData(work, reviews, reviewers) {
  if (work === undefined || reviews === undefined || reviewers === undefined) {
    return
  }
  const lastSubmissionId = work.lastSubmission
    ? work.lastSubmission.id
    : undefined
  return reviewers.map((reviewer) => {
    return {
      ...reviewer,
      reviewAlreadySubmitted: reviews.some(
        (r) =>
          r.submissionId === lastSubmissionId && r.reviewerId === reviewer.id
      ),
    }
  })
}
