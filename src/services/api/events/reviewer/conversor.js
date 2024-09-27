import {REVIEW_STATUS_LABELS_REVERSE, REVIEW_STATUS_LABELS} from "@/lib/Constants"

export function convertAssignments(assignments) {
  return assignments.map((a) => convertAssignment(a));
}

function getMainAuthorFullName(work) {
  let mainAuthor = work.authors.filter(a => a.is_main)[0]
  if (!mainAuthor) {
    console.error("Should have created the work with a main author in the frontend");
    mainAuthor = work.authors[0]
  }
  return mainAuthor.full_name;
}

function convertAssignment(assignment) {
  return {
    id: assignment.work_id,
    title: assignment.work.title,
    authorCount: assignment.work.authors.length,
    submitter: getMainAuthorFullName(assignment.work),
    maxReviewDate: new Date(assignment.review_deadline),
    track: assignment.work.track,
    authors: assignment.work.authors.map((a) => a.full_name),
    abstract: assignment.work.abstract
  }
}

export function convertReviewToReviewBody(review) {
  const reviewDecisionAnswer = REVIEW_STATUS_LABELS_REVERSE[review[review.length - 1]["answer"]];
  return {
    status: reviewDecisionAnswer,
    review: {
      answers: review.slice(0, -1)
    }
  }
}

export function convertReviewSkeletonQuestions(questions) {
  return [...questions, {
    type_question: "multiple_choice",
    question: "Recomendación",
    more_than_one_answer_allowed: false,
    options: Object.values(REVIEW_STATUS_LABELS)
  }]
}
